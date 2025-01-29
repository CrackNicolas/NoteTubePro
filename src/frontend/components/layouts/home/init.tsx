'use client'

import { Component } from "@/frontend/types/component";
import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import IContext from "@/context/interfaces/context";
import useAppContext from "@/context/hooks/context";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentLink from "@/frontend/components/partials/link";
import ComponentPresentationHeader from "@/frontend/components/layouts/home/presentation";

export default function ComponentInit(): Component {
    const { opacity }: IContext = useAppContext();

    return (
        <article className={`${opacity && 'opacity-40'} flex flex-col min-h-screen justify-between relative w-full px-6 lg:px-8 pb-5`}>
            <article className="mt-[120px] flex flex-col items-center gap-y-7">
                <ComponentPresentationHeader title="Aplicación de notas" subtitle="¡Organiza tu vida, toma notas sin límites" />
                <div className="mt-3 flex items-center justify-center gap-x-6">
                    <ComponentLink url={APP_ROUTES.home} title="Empezar" descriptionClass="group flex items-center gap-x-2 rounded-md border-none bg-custom-gradient px-3.5 py-2.5 cursor-pointer">
                        <ComponentIcon name="box" size={16} descriptionClass="group-hover:rotate-[360deg] duration-700" />
                        <span className="text-md group-hover:font-semibold tracking-wider duration-300">
                            Click para iniciar
                        </span>
                    </ComponentLink>
                </div>
            </article>
            <span className="text-center text-sm dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-60 font-normal tracking-wide">
                Version {process.env.PROJECT_VERSION}
            </span>
        </article>
    )
}