import { Fragment } from "react";
import { Component } from "@/frontend/types/component";
import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import useAppTranslation from "@/shared/hooks/translation";

import IElement from "@/frontend/interfaces/elements/element";
import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentButtonMainHome from "@/frontend/components/layouts/home/button_main";

interface IPresentationHeader extends Pick<IElement, 'title' | 'subtitle'> {
    button?: boolean
}

export default function ComponentPresentationHeader(props: IPresentationHeader): Component {
    const { title, subtitle, button = true } = props;

    const { translate } = useAppTranslation();

    return (
        <Fragment>
            <ComponentIcon testid="icon-home" name="logo-fill" size={70} descriptionClass="text-secondary text-opacity-60 dark:text-seventh" />
            <div className="flex flex-col sm:gap-y-2">
                <h1 className="text-gradient text-center font-bold tracking-wider dark:text-dark-tertiary text-tertiary text-2xl sm:text-6xl">
                    {title}
                </h1>
                <p className="text-center text-md sm:text-lg leading-6 dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-80 tracking-wider">
                    {subtitle}
                </p>
            </div>
            {
                button && <ComponentButtonMainHome url={APP_ROUTES.dashboard.main} title={translate('home.button')} />
            }
        </Fragment>
    )
}