'use client'

import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useMemo, useState } from "react";

import { httpRequest } from "@/backend/logic/requests";

import IContext from "@/context/interfaces/context";
import ILayouts from "@/frontend/interfaces/layouts";

import useTheme from "@/context/hooks/theme";
import useCurrentPath from "@/frontend/hooks/path";

import { PropsNote } from "@/context/types/note";
import { PropsSession, PropsUser } from "@/context/types/session";

import { Component } from "@/frontend/types/component";
import { ComponentUserButton } from "@/frontend/components/services/clerk";
import { PropsTheme, ThemeName } from "@/frontend/types/theme";

import { timeElapsed } from "@/frontend/logic/format_time";

import TemplateContext from "@/context/template";

export default function Provider({ children }: ILayouts): Component {
    const [note, setNote] = useState<PropsNote>();
    const [theme, setTheme] = useState<PropsTheme>(ThemeName.ligth);
    const [session, setSession] = useState<PropsSession>({});

    const dataUser = useUser();

    useTheme({ setTheme });

    const sectionCurrent: string = useCurrentPath();

    const loadUser = useCallback(async (): Promise<void> => {
        const { isSignedIn, user } = dataUser;

        if (isSignedIn && user.fullName) {
            const dataSession = (await user.getSessions())[0];

            const instanceUser: PropsUser = {
                name: user.fullName,
                email: user.emailAddresses.toString(),
                image: user.imageUrl,
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
                    ipAdress: (dataSession.latestActivity.ipAddress) ? dataSession.latestActivity.ipAddress : '',
                    city: (dataSession.latestActivity.city) ? dataSession.latestActivity.city : ''
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
    }, [dataUser, session.id]);

    useEffect(() => {
        loadUser();
    }, [dataUser.user, loadUser])

    const contextValue: IContext = useMemo(() => ({
        sectionCurrent,
        session,
        buttonSesion: <ComponentUserButton />,
        theme,
        setTheme,
        note,
        setNote
    }), [sectionCurrent, session, theme, note]);

    return (
        <TemplateContext value={contextValue}>
            {children}
        </TemplateContext>
    )
}