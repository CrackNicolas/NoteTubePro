'use client'

import { useRouter } from "next/navigation"

import { APP_ROUTES } from "@/frontend/constant/app_rutes"
import { Component } from "@/frontend/types/component"
import { PropsItemsDashboard } from "@/frontend/types/props"

import IContext from "@/context/interfaces/context"
import IElement from "@/frontend/interfaces/elements/element"

import useAppContext from "@/context/hooks/context"
import useAppTranslation from "@/shared/hooks/translation"

import ComponentItem from "@/frontend/components/partials/template/dashboard/item"
import ComponentHeader from "@/frontend/components/partials/template/dashboard/header"
import ComponentMotion from "@/frontend/components/partials/motion"
import ComponentLoading from "@/frontend/components/partials/template/dashboard/loading"
import ComponentButtonGoBack from "@/frontend/components/partials/button_go_back"

interface ITemplateDashboard {
    header?: Pick<IElement, 'title' | 'subtitle'>,
    items: PropsItemsDashboard[],
    viewRedirect?: boolean
}

export default function ComponentTemplateDashboard(props: ITemplateDashboard): Component {
    const { translate } = useAppTranslation();

    const { header = {
        title: translate('dashboard.title'),
        subtitle: translate('dashboard.subtitle'),
    }, items, viewRedirect = false } = props;

    const router = useRouter();

    const { opacity }: IContext = useAppContext();

    return (
        <ComponentMotion type="article" descriptionClass={`${opacity && 'opacity-40'} min-h-screen relative dark:bg-dark-primary bg-primary 2xl:px-0 sm:pl-5 sm:pt-20 pt-16 pb-9`}>
            <ComponentHeader title={header.title} subtitle={header.subtitle} />
            <ComponentMotion type="article" descriptionClass="relative pb-10 sm:pb-9 mx-auto place-items-center mt-1 grid max-w-2xl grid-cols-1 lg:gap-8 gap-3 pt-10 sm:mt-10 sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {viewRedirect && <ComponentButtonGoBack onClick={() => router.push(APP_ROUTES.dashboard.main)} descriptionClass="p-1.5 top-0 left-0" />}
                {
                    (items.length === 0) ?
                        <ComponentLoading count={6} />
                        :
                        items.map((item: PropsItemsDashboard, index: number) => {
                            return <ComponentItem key={index} props={item} />
                        })
                }
            </ComponentMotion>
        </ComponentMotion>
    )
}