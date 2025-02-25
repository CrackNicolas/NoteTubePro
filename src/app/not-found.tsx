'use client'

import { Component } from "@/frontend/types/component";
import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import ComponentIcon from "@/frontend/components/partials/icon";

import useAppTranslation from "@/shared/hooks/translation";
import ComponentButtonMainHome from "@/frontend/components/layouts/home/button_main";

export default function NotFound(): Component {
    const { translate } = useAppTranslation();

    return (
        <article className="dark:bg-dark-primary bg-primary pt-24 pb-9 min-h-screen">
            <article className="flex flex-col items-center gap-y-4 max-w-7xl px-2 lg:px-10">
                <div className="flex flex-col place-items-center">
                    <ComponentIcon name="not-found" size={200} viewBox="0 0 200 200" />
                    <h3 className="mt-5 text-gradient text-center tracking-wide text-xl">
                        {translate('not_found.title')}
                    </h3>
                    <h4 className="dark:text-dark-fifth text-fifth text-center tracking-wide text-md">
                        {translate('not_found.subtitle')}
                    </h4>
                </div>
                <ComponentButtonMainHome url={`${process.env.DEVELOPMENT_DOMAIN}${APP_ROUTES.dashboard.main}`} title={translate('not_found.button.text_1')} />
            </article>
        </article>
    )
}