import { Component } from "@/frontend/types/component";

import IElement from "@/frontend/interfaces/elements/element";
import ComponentMotion from "@/frontend/components/partials/motion";

interface IItemMainHome extends Pick<IElement, 'title' | 'subtitle'> {
    icon: Component
}

export default function ComponentItemMainHome(props: IItemMainHome): Component {
    const { icon, title, subtitle } = props;

    return (
        <ComponentMotion type="div" descriptionClass="flex flex-col items-center p-3 md:p-5 rounded-lg bg-gradient-to-r from-primary dark:from-dark-primary from-95% to-secondary dark:to-dark-secondary to-2% shadow-sm shadow-secondary dark:shadow-dark-secondary">
            {icon}
            <h3 className="text-lg sm:text-xl font-semibold md:mb-2 text-gradient">
                {title}
            </h3>
            <p className="text-center opacity-70 text-tertiary dark:text-dark-tertiary">
                {subtitle}
            </p>
        </ComponentMotion>
    )
}