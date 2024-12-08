'use client'

import { useUser } from "@clerk/nextjs";

import { usePathname, useRouter } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import { createContext, Suspense, useCallback, useEffect, useMemo, useState } from "react";

import { Props_context } from "@/context/types/context";
import { Props_session, Props_user } from "@/context/types/session";

import { ComponentUserButton } from "@/frontend/components/services/clerk";

import Template from '@/frontend/template/init';
import ComponentLoad from "@/frontend/components/partials/load";

import { Request } from "@/backend/logic/requests";
import { Change_topic } from "@/frontend/logic/theme";
import { Time_elapsed } from "@/frontend/logic/format_time";
import { Props_layouts, Props_theme, Theme_name } from "@/frontend/types/props";

export const Context = createContext<Props_context>({
    section_current: '',
    session: {},
    button_sesion: <ComponentUserButton />,
    opacity: false,
    theme: Theme_name.ligth,
    setTheme: () => { },
    setOpacity: () => { }
});

export default function Provider({ children }: Props_layouts): JSX.Element {
    const [session, setSession] = useState<Props_session>({});

    const [theme, setTheme] = useState<Props_theme>(Theme_name.ligth);

    const data_user = useUser();

    const router = useRouter();
    const path = usePathname();

    const section_current: string = useMemo(() => path.substring(1), [path]);

    const load_user = useCallback(async (): Promise<void> => {
        const { isSignedIn, user } = data_user;

        if (isSignedIn && user.fullName) {
            const data_session = (await user.getSessions())[0];

            const instance_user: Props_user = {
                name: user.fullName,
                email: user.emailAddresses.toString(),
                image: user.imageUrl,
                rol: 'member'
            }

            const { data } = await Request({ type: 'GET', url: `/api/role/${user.id}` });
            instance_user.rol = data.data;

            const instance_session: Props_session = {
                id: user.id,
                status: (data_session.status === 'active'),
                last_time: Time_elapsed(data_session.lastActiveAt) + ' ' + data_session.lastActiveAt.toString().split(' ')[4] + 'hs',
                expiret: data_session.expireAt.toISOString(),
                origin: {
                    IP_adress: (data_session.latestActivity.ipAddress) ? data_session.latestActivity.ipAddress : '',
                    city: (data_session.latestActivity.city) ? data_session.latestActivity.city : ''
                },
                user: instance_user
            }

            await Request({ type: 'GET', url: `/api/categorys` });
            await Request({ type: 'POST', url: "/api/private/sessions", body: instance_session });

            setSession(instance_session);
        } else {
            await Request({ type: 'PUT', url: "/api/private/sessions", body: { id: session.id, status: false } });
            setSession({});
        }
    }, [data_user, session.id]);

    const handleOffline = useCallback((): void => {
        router.push('/without_internet');
    }, [router])

    const handleOnline = useCallback((): void => {
        if (path === '/offline') {
            router.push('/');
        }
    }, [path, router])

    useEffect(() => {
        const stored_theme: Theme_name = localStorage.getItem('theme') as Props_theme;
        if (stored_theme) {
            Change_topic({ theme: stored_theme, setTheme });
        }
    }, [])

    useEffect(() => {
        load_user();
    }, [data_user.user, load_user])

    useEffect(() => {
        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        if (!navigator.onLine) {
            handleOffline();
        }

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, [path, handleOffline, handleOnline])

    const context_value: Props_context = useMemo(() => ({
        section_current,
        session,
        button_sesion: <ComponentUserButton />,
        opacity: false,
        theme,
        setTheme,
        setOpacity: () => { },
        path
    }), [section_current, session, theme, path]);

    return (
        <Context.Provider value={context_value}>
            <ProgressBar color={theme} options={{ showSpinner: false }} />
            <Suspense fallback={<ComponentLoad />}>
                <Template>
                    {children}
                </Template>
            </Suspense>
        </Context.Provider>
    )
}