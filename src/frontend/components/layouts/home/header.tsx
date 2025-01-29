import IElement from "@/frontend/interfaces/elements/element";

import ComponentMotion from "@/frontend/components/partials/motion";
import ComponentPresentationHeader from "@/frontend/components/layouts/home/presentation";

export default function ComponentHeaderHome(props: Pick<IElement, 'title' | 'subtitle'>): JSX.Element {
    return (
        <ComponentMotion type="header" descriptionClass="flex flex-col items-center mt-[120px] gap-y-7 text-center px-6 lg:px-8 pb-5" >
            <ComponentPresentationHeader {...props} />
        </ComponentMotion>
    )
}