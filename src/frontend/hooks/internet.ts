import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import useCurrentPath from "@/frontend/hooks/path";
import { APP_ROUTES } from "@/frontend/constant/app_rutes";

export default function useOnlineStatusRedirect(): void {
    const path: string = useCurrentPath();
    const router = useRouter();

    const handleOnline = useCallback((): void => {
        if (path === '/offline') {
            router.push(APP_ROUTES.home);
        }
    }, [path, router])

    const handleOffline = useCallback((): void => {
        router.push(APP_ROUTES.withoutInternet);
    }, [router])

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
}