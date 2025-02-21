'use client'

import { Component } from '@/frontend/types/component'
import { APP_ROUTES } from '@/frontend/constant/app_rutes'

import ComponentIcon from '@/frontend/components/partials/icon'
import ComponentLink from '@/frontend/components/partials/link'

import useAppTranslation from '@/shared/hooks/translation';

export default function WithoutInternet(): Component {
    const { translate } = useAppTranslation();

    return (
        <article className="min-h-screen dark:bg-dark-primary bg-primary pt-24 pb-9">
            <article className="flex flex-col items-center gap-y-4 max-w-7xl px-2 lg:px-10">
                <div className="flex flex-col place-items-center">
                    <ComponentIcon name="without_internet" size={250} viewBox="0 0 192 195" />
                    <h2 className="mt-5 dark:text-dark-tertiary text-tertiary text-center tracking-wide text-xl">
                        {translate('without_internet.title')}
                    </h2>
                    <p className="dark:text-dark-fifth text-fifth text-center tracking-wide text-md">
                        {translate('without_internet.subtitle')}
                    </p>
                </div>
                <ComponentLink url={`${process.env.DEVELOPMENT_DOMAIN}${APP_ROUTES.dashboard.main}`} title={translate('without_internet.button')} descriptionClass="border-[0.1px] dark:border-dark-secondary border-secondary px-3 py-1 b rounded-md dark:hover:bg-dark-secondary hover:bg-secondary dark:hover:text-dark-primary hover:text-primary dark:bg-dark-primary bg-primary dark:text-dark-secondary text-secondary text-center text-md tracking-wide">
                    {translate('without_internet.button')}
                </ComponentLink>
            </article>
        </article>
    )
}