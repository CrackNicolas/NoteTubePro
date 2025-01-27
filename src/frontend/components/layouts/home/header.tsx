import IElement from "@/frontend/interfaces/elements/element";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentMotion from "@/frontend/components/partials/motion";

interface IHeaderHome extends Pick<IElement, 'title' | 'subtitle'> { }

export default function ComponentHeaderHome(props: IHeaderHome): JSX.Element {
    const { title, subtitle } = props;

    return (
        <ComponentMotion type="header" descriptionClass="flex flex-col items-center mt-[130px] gap-y-9 text-center p-8 rounded-lg" >
            <ComponentIcon testid="icon-modern-home" name="logo" size={70} descriptionClass="text-secondary" />
            <div className="flex flex-col sm:gap-y-2">
                <h1 className="font-bold tracking-wider text-4xl sm:text-6xl text-tertiary">
                    {title}
                </h1>
                <p className="mt-3 text-lg leading-8 opacity-80 text-tertiary">
                    {subtitle}
                </p>
            </div>
        </ComponentMotion>
    )
}