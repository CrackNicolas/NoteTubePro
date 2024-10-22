'use client'

import { useRouter } from "next/navigation"

import ComponentIcon from "@/frontend/components/partials/icon"
import ComponentItem from "@/frontend/components/partials/template/dashboard/item"
import ComponentHeader from "@/frontend/components/partials/template/dashboard/header"
import ComponentLoading from "@/frontend/components/partials/template/dashboard/loading"

import { Props_items_dashboard } from "@/frontend/types/props"

type Props = {
    header?: {
        title: string,
        subtitle: string
    },
    items: Props_items_dashboard[],
    view_redirect?: boolean
}

export default function ComponentTemplateDashboard(props: Props) {
    const { header = {
        title: 'Panel de Control',
        subtitle: 'Organiza tu mundo, mantente al tanto de lo más importante.'
    }, items, view_redirect = false } = props;

    const router = useRouter();

    return (
        <article className="h-screen relative dark:bg-dark-primary bg-primary sm:pt-20 pt-16 pb-9">
            <ComponentHeader title={header.title} subtitle={header.subtitle} />
            <div className="relative pb-9 mx-auto place-items-center mt-1 sm:mt-7 grid max-w-2xl grid-cols-1 lg:gap-8 gap-3 pt-10 sm:mt-10 sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {
                    view_redirect && (
                        <span className="absolute top-0 left-0 dark:bg-dark-primary bg-primary rounded-full p-1.5 dark:hover:bg-dark-room hover:bg-room transition duration-500" title="Volver atras" onClick={() => router.push('/dashboard/main')}>
                            <ComponentIcon name="return" size={22} description_class="rotate-[-180deg] dark:text-dark-secondary text-secondary cursor-pointer" />
                        </span>
                    )
                }
                {
                    (items.length === 0) ?
                        <ComponentLoading count={6} />
                        :
                        items.map((item: Props_items_dashboard, index: number) => {
                            return <ComponentItem key={index} url={item.url} icon={item.icon} title={item.title} description={item.description} />
                        })
                }
            </div>
        </article>
    )
}