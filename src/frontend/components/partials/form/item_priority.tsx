import { Fragment } from "react";

import { Component } from "@/frontend/types/component";
import { IErrorBase } from "@/frontend/interfaces/elements/form/error";

import IElement from "@/frontend/interfaces/elements/element";
import IInputBase from "@/frontend/interfaces/elements/form/input";

import useAppTranslation from "@/shared/hooks/translation";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentInput from "@/frontend/components/partials/form/input";

interface IItemPriority extends Pick<IInputBase, 'value' | 'register' | 'descriptionClass'>, IErrorBase, Partial<Pick<IElement, 'paint'>> {
    id: string
}

export default function ComponentItemPriority(props: IItemPriority): Component {
    const { id, descriptionClass, value, paint, error, register } = props;

    const { translate } = useAppTranslation();

    const translateValue: string = translate(`notes.form.items.priority.options.${value?.toLocaleLowerCase()}`);

    return (
        <Fragment>
            <ComponentInput type="radio" name="priority" id={id} value={value} descriptionClass="hidden" register={register} />
            <label htmlFor={id} title={translateValue} className={`group border-opacity-50 ${(!error) ? 'dark:border-dark-secondary border-secondary' : 'dark:border-dark-error border-error'} col-span-1 border-[0.1px] rounded-md flex place-items-center overflow-hidden cursor-pointer`}>
                <ComponentIcon name="arrow" size={20} descriptionClass={`w-[30px] cursor-pointer ${descriptionClass}`} />
                <span className={` ${paint ? 'bg-custom-gradient text-tertiary' : ` ${(!error) ? 'dark:text-primary text-secondary dark:group-hover:bg-error group-hover:bg-custom-gradient dark:group-hover:text-dark-primary group-hover:text-tertiary' : 'dark:text-dark-error text-error dark:group-hover:bg-dark-error group-hover:bg-error dark:group-hover:text-dark-primary group-hover:text-primary'}  `} w-full text-center text-[14.4px] tracking-wider font-semibold cursor-pointer py-[5.1px] `}>
                    {translateValue}
                </span>
            </label>
        </Fragment>
    )
}