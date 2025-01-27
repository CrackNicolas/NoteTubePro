import IElement from "@/frontend/interfaces/elements/element";

import ComponentMotion from "@/frontend/components/partials/motion";

interface IItemMainHome extends Pick<IElement, 'title' | 'subtitle'> {
    icon: JSX.Element
}

export default function ComponentItemMainHome(props: IItemMainHome): JSX.Element {
    const { icon, title, subtitle } = props;

    return (
        <ComponentMotion type="div" descriptionClass="flex flex-col items-center p-5 rounded-lg bg-gradient-to-r from-primary from-95% to-secondary to-3% shadow-sm shadow-secondary">
            {icon}
            <h3 className="text-xl font-semibold mb-2 text-tertiary">
                {title}
            </h3>
            <p className="text-center opacity-70 text-tertiary">
                {subtitle}
            </p>
        </ComponentMotion>
    )
}