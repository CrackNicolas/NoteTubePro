'use client'

import { Component } from "@/frontend/types/component";
import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import IContext from "@/context/interfaces/context";
import useAppContext from "@/context/hooks/context";
import useAppTranslation from "@/shared/hooks/translation";

import ComponentButtonMainHome from "@/frontend/components/layouts/home/button_main";
import ComponentPresentationHeader from "@/frontend/components/layouts/home/presentation";

export default function ComponentInit(): Component {
    const { opacity }: IContext = useAppContext();

    const { translate } = useAppTranslation();

    return (
        <article className={`${opacity && 'opacity-40'} flex flex-col min-h-screen justify-between relative w-full px-6 lg:px-8 pb-5`}>
            <article className="mt-[120px] flex flex-col items-center gap-y-7">
                <ComponentPresentationHeader title={translate('init.title')} subtitle={translate('init.subtitle')} button={false} />
                <div className="sm:mt-3 flex items-center justify-center">
                    <ComponentButtonMainHome url={APP_ROUTES.home} title={translate('init.button')} />
                </div>
            </article>
            <span className="mb-10 sm:mb-0 text-center text-sm dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-60 font-normal tracking-wide">
                Version {process.env.PROJECT_VERSION}
            </span>
        </article>
    )
}