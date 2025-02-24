import { Component } from "@/frontend/types/component";
import { FaCogs, FaRegLightbulb, FaRocket } from "react-icons/fa";

import useAppTranslation from "@/shared/hooks/translation";

import ComponentMotion from "@/frontend/components/partials/motion";
import ComponentItemMainHome from "@/frontend/components/layouts/home/sections/main/item";

export default function ComponentMainHome(): Component {
    const { translate } = useAppTranslation();

    return (
        <ComponentMotion type="section" descriptionClass="mt-16 grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-6">
            <ComponentItemMainHome
                icon={<FaRegLightbulb className="text-secondary dark:text-seventh text-opacity-60 text-4xl sm:text-5xl pb-2 md:mb-4" />}
                title={translate('home.sections.main.article_1.title')}
                subtitle={translate('home.sections.main.article_1.subtitle')}
            />
            <ComponentItemMainHome
                icon={<FaRocket className="text-secondary dark:text-seventh text-opacity-60 text-4xl sm:text-5xl pb-2 md:mb-4" />}
                title={translate('home.sections.main.article_2.title')}
                subtitle={translate('home.sections.main.article_2.subtitle')}
            />
            <ComponentItemMainHome
                icon={<FaCogs className="text-secondary dark:text-seventh text-opacity-60 text-4xl sm:text-5xl pb-2 md:mb-4" />}
                title={translate('home.sections.main.article_3.title')}
                subtitle={translate('home.sections.main.article_3.subtitle')}
            />
        </ComponentMotion>
    )
}