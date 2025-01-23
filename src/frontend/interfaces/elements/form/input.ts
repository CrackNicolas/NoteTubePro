import { PropsNote } from "@/context/types/note";

import IElement from "@/frontend/interfaces/elements/element";
import IRegister from "@/frontend/interfaces/elements/form/register";

export type PropsInputName = keyof Pick<PropsNote, 'title' | 'description' | 'priority' | 'featured'>

export default interface IInputBase extends IRegister, Pick<IElement, 'descriptionClass'> {
    id?: string,
    type?: string,
    name: PropsInputName,
    rows?: number,
    value?: string,
    required?: boolean,
    placeholder?: string
}