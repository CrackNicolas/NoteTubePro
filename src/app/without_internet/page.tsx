'use client'

import { Component } from '@/frontend/types/component'
import { APP_ROUTES } from '@/frontend/constant/app_rutes'

import ComponentIcon from '@/frontend/components/partials/icon'
import ComponentButtonMainHome from '@/frontend/components/layouts/home/button_main'

import useAppTranslation from '@/shared/hooks/translation';

export default function WithoutInternet(): Component {
    const { translate } = useAppTranslation();

    return (
        <article className="min-h-screen pt-24 pb-9">
            <article className="flex flex-col items-center gap-y-4 max-w-7xl px-2 lg:px-10">
                <div className="flex flex-col place-items-center">
                    <ComponentIcon name="without_internet" size={250} viewBox="0 0 192 195" />
                    <h2 className="mt-5 text-gradient text-center tracking-wide text-xl">
                        {translate('without_internet.title')}
                    </h2>
                    <p className="dark:text-dark-fifth text-fifth text-center tracking-wide text-md">
                        {translate('without_internet.subtitle')}
                    </p>
                </div>
                <ComponentButtonMainHome url={`${process.env.DEVELOPMENT_DOMAIN}${APP_ROUTES.dashboard.main}`} title={translate('without_internet.button')} />
            </article>
        </article>
    )
}