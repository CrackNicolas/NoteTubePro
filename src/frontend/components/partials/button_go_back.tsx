import { Component } from "@/frontend/types/component";

import useAppTranslation from "@/shared/hooks/translation";

import IElement from "@/frontend/interfaces/elements/element";
import ComponentIcon from "@/frontend/components/partials/icon";

interface IButtonGoBack extends Pick<IElement, 'onClick' | 'descriptionClass'> { }

export default function ComponentButtonGoBack(props: IButtonGoBack): Component {
    const { onClick, descriptionClass } = props;

    const { translate } = useAppTranslation();

    return (
        <span onClick={onClick} className={`absolute ${descriptionClass} bg-custom-gradient rounded-sm py-0.5 px-1.5 dark:hover:bg-dark-room hover:bg-room transition duration-500 cursor-pointer`} title={translate('dashboard.button')} >
            <ComponentIcon name="return" size={22} descriptionClass="rotate-[-180deg] dark:text-primary text-tertiary cursor-pointer" />
        </span>
    )
}