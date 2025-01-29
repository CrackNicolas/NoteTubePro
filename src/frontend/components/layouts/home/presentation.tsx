import { Fragment } from "react";
import { Component } from "@/frontend/types/component";
import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import IElement from "@/frontend/interfaces/elements/element";
import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentLink from "@/frontend/components/partials/link";

export default function ComponentPresentationHeader(props: Pick<IElement, 'title' | 'subtitle'>): Component {
    const { title, subtitle } = props;

    return (
        <Fragment>
            <ComponentIcon testid="icon-home" name="logo-fill" size={70} descriptionClass="text-secondary text-opacity-60 dark:text-seventh" />
            <div className="flex flex-col sm:gap-y-2">
                <h1 className="text-gradient text-center font-bold tracking-wider dark:text-dark-tertiary text-tertiary text-2xl sm:text-6xl">
                    {title}
                </h1>
                <p className="text-center text-md sm:text-lg leading-8 dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-80 tracking-wider">
                    {subtitle}
                </p>
            </div>
            <ComponentLink url={APP_ROUTES.dashboard.main} title="Empezar" descriptionClass="bg-custom-gradient group mt-6 flex items-center gap-x-2 rounded-md bg-secondary dark:bg-dark-secondary text-primary dark:text-dark-primary px-6 py-3 text-lg font-semibold text-black shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-500">
                <ComponentIcon name="box" size={20} descriptionClass="text-primary dark:text-dark-primary group-hover:rotate-[360deg] transition-transform duration-700" />
                <span>
                    Comienza Ahora
                </span>
            </ComponentLink>
        </Fragment>
    )
}