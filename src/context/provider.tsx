'use client'

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Component } from "@/frontend/types/component";
import { httpRequest } from "@/backend/logic/requests";

import IContext from "@/context/interfaces/context";
import ILayouts from "@/frontend/interfaces/layouts";

import useTheme from "@/context/hooks/theme";
import useCurrentPath from "@/frontend/hooks/path";

import { PropsNote } from "@/context/types/note";
import { PropsTheme, ThemeName } from "@/frontend/types/theme";
import { PropsSession, PropsUser } from "@/context/types/session";

import { timeElapsed } from "@/frontend/logic/format_time";
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

    const sectionCurrent: string = useCurrentPath();

    const loadUser = useCallback(async (): Promise<void> => {
        const { isSignedIn, user, isLoaded } = dataUser;

        if (isLoaded && !isSignedIn && user == null) {
            router.push("/");
        }

        if (isSignedIn && user.fullName) {
            const dataSession = (await user.getSessions())[0];

            const instanceUser: PropsUser = {
                name: user.fullName,
                email: user.emailAddresses.toString(),
                image: user.imageUrl,
                lastSignInAt: user.lastSignInAt,
                rol: 'member'
            }

            const { data } = await httpRequest({ type: 'GET', url: `/api/role/${user.id}` });
            instanceUser.rol = data.data;

            const instanceSession: PropsSession = {
                id: user.id,
                status: (dataSession.status === 'active'),
                lastTime: timeElapsed(dataSession.lastActiveAt) + ' ' + dataSession.lastActiveAt.toString().split(' ')[4] + 'hs',
                expiret: dataSession.expireAt.toISOString(),
                origin: {
                    ipAdress: (dataSession.latestActivity.ipAddress) ?? '',
                    city: (dataSession.latestActivity.city) ?? ''
                },
                user: instanceUser
            }

            await httpRequest({ type: 'GET', url: `/api/categorys` });
            await httpRequest({ type: 'POST', url: "/api/private/sessions", body: instanceSession });

            setSession(instanceSession);
        } else {
            await httpRequest({ type: 'PUT', url: "/api/private/sessions", body: { id: session.id, status: false } });
            setSession({});
        }
    }, [dataUser.user, session.id])

    useEffect(() => {
        loadUser();
    }, [dataUser.isSignedIn, loadUser])

    const contextValue: IContext = useMemo(() => ({
        opacity,
        setOpacity,
        sectionCurrent,
        session: {
            value: session,
            isSignedIn: dataUser.isSignedIn
        },
        buttonSesion: <ComponentUserButton />,
        theme,
        setTheme,
        note,
        setNote
    }), [sectionCurrent, session, theme, note, opacity]);

    return (
        <TemplateContext value={contextValue}>
            {children}
        </TemplateContext>
    )
}