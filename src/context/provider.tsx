'use client'

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Component } from "@/frontend/types/component";
import { httpRequest } from "@/shared/logic/requests";

import IContext from "@/context/interfaces/context";
import ILayouts from "@/frontend/interfaces/layouts";

import useTheme from "@/context/hooks/theme";
import useCurrentPath from "@/frontend/hooks/path";
import useOnlineStatusRedirect from "@/frontend/hooks/internet";

import { PropsNote } from "@/context/types/note";
import { PropsTheme, ThemeName } from "@/frontend/types/theme";
import { PropsSession, PropsUser } from "@/context/types/session";

import { RolUser } from "@/shared/enums/user/rol";
import { StatusUser } from "@/shared/enums/user/status";
import { APP_ROUTES } from "@/frontend/constant/app_rutes";
import { timeElapsed } from "@/frontend/logic/format_time";
import { ValueBoolean } from "@/frontend/enums/boolean";
import { ComponentUserButton } from "@/frontend/components/services/clerk";

import TemplateContext from "@/context/template";

export default function Provider({ children }: ILayouts): Component {
    const [note, setNote] = useState<PropsNote>();
    const [theme, setTheme] = useState<PropsTheme>(ThemeName.ligth);
    const [opacity, setOpacity] = useState<boolean>(false);
    const [session, setSession] = useState<PropsSession>({});

    const dataUser = useUser();
    const router = useRouter();

    useTheme({ setTheme });
    useOnlineStatusRedirect();

    const sectionCurrent: string = useCurrentPath(true);

    const loadUser = useCallback(async (): Promise<void> => {
        const { isSignedIn, user, isLoaded } = dataUser;

        if (!isLoaded) return;

        if (isLoaded && !isSignedIn && user == null) {
            await httpRequest({ type: 'PUT', url: "/api/private/sessions", body: { id: session.id, status: false } });
            setSession({});
            router.push(APP_ROUTES.init);
        }

        if (isSignedIn && user.fullName) {
            const instanceUser: PropsUser = {
                name: user.fullName,
                email: user.emailAddresses.toString(),
                image: user.imageUrl,
                lastSignInAt: user.lastSignInAt,
                rol: RolUser.MEMBER
            }

            const [rol, session, categorys] = await Promise.all([
                httpRequest({ type: 'GET', url: `/api/role/${user.id}` }), //get rol
                user.getSessions(), // session[0]
                httpRequest({ type: 'GET', url: `/api/categorys` }) //Cargar categorias
            ]);

            instanceUser.rol = rol.data.details;

            const instanceSession: PropsSession = {
                id: user.id,
                status: (session[0].status === StatusUser.ACTIVE),
                lastTime: timeElapsed(session[0].lastActiveAt) + ' ' + session[0].lastActiveAt.toString().split(' ')[4] + 'hs',
                expiret: session[0].expireAt.toISOString(),
                origin: {
                    ipAdress: (session[0].latestActivity.ipAddress) ?? '',
                    city: (session[0].latestActivity.city) ?? ''
                },
                user: instanceUser
            }
            setSession(instanceSession);
            await httpRequest({ type: 'POST', url: "/api/private/sessions", body: instanceSession });
        }
    }, [dataUser.user, session.id])

    useEffect(() => {
        if (sectionCurrent !== APP_ROUTES.notes.init) {
            localStorage.setItem('last_page', ValueBoolean.NOT);
        }
        if (sectionCurrent !== APP_ROUTES.notes.init) {
            setNote(undefined);
        }
    }, [sectionCurrent]);

    useEffect(() => {
        loadUser();
    }, [dataUser.isSignedIn, loadUser])

    const contextValue: IContext = useMemo(() => ({
        opacity,
        setOpacity,
        session: {
            value: session,
            isSignedIn: dataUser.isSignedIn
        },
        buttonSesion: <ComponentUserButton />,
        theme,
        setTheme,
        note,
        setNote
    }), [session, theme, note, opacity]);

    return (
        <TemplateContext value={contextValue}>
            {children}
        </TemplateContext>
    )
}