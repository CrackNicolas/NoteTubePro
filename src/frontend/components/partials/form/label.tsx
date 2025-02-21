import IElement from "@/frontend/interfaces/elements/element";

import { Component } from "@/frontend/types/component";
import { IErrorLabel } from "@/frontend/interfaces/elements/form/error";

import useAppTranslation from "@/shared/hooks/translation";

interface ILabel extends Pick<IElement, 'title'>, IErrorLabel {
    color?: string,
    htmlFor: string,
    valuesExists?: boolean
}

export default function ComponentLabel(props: ILabel): Component {
    const { title, htmlFor, errors, color = 'dark:text-dark-secondary text-secondary', valuesExists = false } = props;

    const { translate } = useAppTranslation();

    const existsError = errors && errors[htmlFor];

    return (
        <label title={title} htmlFor={htmlFor} className={`line-clamp-1 text-sm font-normal ${valuesExists && "text-yellow-500"} ${(!existsError) ? color : 'dark:text-dark-error text-error'} tracking-wider`}>
            {
                existsError ? `${translate(`${errors[htmlFor]?.message}`)}` : valuesExists ? translate('notes.form.items.title.messages.duplicate') : title
            }
        </label>
    )
}