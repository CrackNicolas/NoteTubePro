import { Component } from "@/frontend/types/component";

import useAppTranslation from "@/shared/hooks/translation";

import IElement from "@/frontend/interfaces/elements/element";
import ComponentIcon from "@/frontend/components/partials/icon";

interface IButtonGoBack extends Pick<IElement, 'onClick' | 'descriptionClass'> { }

export default function ComponentButtonGoBack(props: IButtonGoBack): Component {
    const { onClick, descriptionClass } = props;

    const { translate } = useAppTranslation();

    return (
        <span onClick={onClick} className={`absolute ${descriptionClass} dark:bg-dark-primary bg-primary rounded-full dark:hover:bg-dark-room hover:bg-room transition duration-500`} title={translate('dashboard.button')} >
            <ComponentIcon name="return" size={22} descriptionClass="rotate-[-180deg] dark:text-dark-secondary text-secondary cursor-pointer" />
        </span>
    )
}