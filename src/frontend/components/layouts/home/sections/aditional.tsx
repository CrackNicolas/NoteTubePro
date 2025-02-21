import { Component } from "@/frontend/types/component";
import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import useAppTranslation from "@/shared/hooks/translation";

import ComponentMotion from "@/frontend/components/partials/motion";
import ComponentButtonMainHome from "@/frontend/components/layouts/home/button_main";

export default function ComponentAditionalHome(): Component {
    const { translate } = useAppTranslation();

    return (
        <ComponentMotion type="section" descriptionClass="mt-16 flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-center text-gradient">
                {translate('home.sections.footer.title')}
            </h2>
            <p className="mt-3 text-md sm:text-lg text-center opacity-80 text-tertiary dark:text-dark-tertiary">
                {translate('home.sections.footer.subtitle')}
            </p>
            <ComponentButtonMainHome url={APP_ROUTES.dashboard.main} title={translate('home.sections.footer.button')} />
        </ComponentMotion>
    )
}