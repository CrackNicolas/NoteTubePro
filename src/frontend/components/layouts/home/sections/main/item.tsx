import { Component } from "@/frontend/types/component";

import IElement from "@/frontend/interfaces/elements/element";
import ComponentMotion from "@/frontend/components/partials/motion";

interface IItemMainHome extends Pick<IElement, 'title' | 'subtitle' | 'descriptionClass'> {
    icon: Component
}

export default function ComponentItemMainHome(props: IItemMainHome): Component {
    const { icon, title, subtitle, descriptionClass } = props;

    return (
        <ComponentMotion type="div" descriptionClass={`${descriptionClass} col flex flex-col items-center py-3 pl-3 pr-6 md:py-5 md:pl-5 md:pr-8 rounded-lg bg-gradient-to-r from-primary dark:from-tertiary dark:from-[99%] from-95% to-secondary dark:to-seventh dark:to-[1%] to-2% dark:shadow-xl dark:border-[1px] shadow-sm shadow-secondary`}>
            {icon}
            <h3 className="text-lg text-center sm:text-xl font-semibold md:mb-2 text-gradient" title={title}>
                {title}
            </h3>
            <p className="text-center opacity-70 text-tertiary dark:text-dark-tertiary" title={subtitle}>
                {subtitle}
            </p>
        </ComponentMotion>
    )
}