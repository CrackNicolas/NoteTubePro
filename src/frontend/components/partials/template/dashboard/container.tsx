'use client'

import { useRouter } from "next/navigation"

import { APP_ROUTES } from "@/frontend/constant/app_rutes"
import { Component } from "@/frontend/types/component"
import { PropsItemsDashboard } from "@/frontend/types/props"

import IElement from "@/frontend/interfaces/elements/element"

import ComponentIcon from "@/frontend/components/partials/icon"
import ComponentItem from "@/frontend/components/partials/template/dashboard/item"
import ComponentHeader from "@/frontend/components/partials/template/dashboard/header"
import ComponentLoading from "@/frontend/components/partials/template/dashboard/loading"

interface ITemplateDashboard {
    header?: Pick<IElement, 'title' | 'subtitle'>,
    items: PropsItemsDashboard[],
    viewRedirect?: boolean
}

export default function ComponentTemplateDashboard(props: ITemplateDashboard): Component {
    const { header = {
        title: 'Panel de Control',
        subtitle: 'Organiza tu mundo, mantente al tanto de lo más importante.'
    }, items, viewRedirect = false } = props;

    const router = useRouter();

    return (
        <article className="h-screen relative dark:bg-dark-primary bg-primary 2xl:px-0 xl:px-1 sm:pl-3 sm:pt-20 pt-16 pb-9">
            <ComponentHeader title={header.title} subtitle={header.subtitle} />
            <article className="relative pb-16 sm:pb-9 mx-auto place-items-center mt-1 grid max-w-2xl grid-cols-1 lg:gap-8 gap-3 pt-10 sm:mt-10 sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {
                    viewRedirect && (
                        <span className="absolute top-0 left-0 dark:bg-dark-primary bg-primary rounded-full p-1.5 dark:hover:bg-dark-room hover:bg-room transition duration-500" title="Volver atras" onClick={() => router.push(APP_ROUTES.dashboard.main)}>
                            <ComponentIcon name="return" size={22} descriptionClass="rotate-[-180deg] dark:text-dark-secondary text-secondary cursor-pointer" />
                        </span>
                    )
                }
                {
                    (items.length === 0) ?
                        <ComponentLoading count={6} />
                        :
                        items.map((item: PropsItemsDashboard, index: number) => {
                            return <ComponentItem key={index} props={item} />
                        })
                }
            </article>
        </article>
    )
}