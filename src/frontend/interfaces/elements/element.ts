import ILayouts from "@/frontend/interfaces/layouts";

export default interface IElement extends ILayouts {
    state: boolean,
    paint: boolean,
    title: string,
    subtitle: string,
    descriptionClass: string,
    onClick?: () => void,
    onMouseOver?: () => void,
    onMouseLeave?: () => void
}