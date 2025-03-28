import { Fragment } from "react";

import { Component } from "@/frontend/types/component";
import { IErrorBase } from "@/frontend/interfaces/elements/form/error";

import IElement from "@/frontend/interfaces/elements/element";
import IInputBase from "@/frontend/interfaces/elements/form/input";

import useAppTranslation from "@/shared/hooks/translation";

import ComponentInput from "@/frontend/components/partials/form/input";

interface IItemFeatured extends Pick<IInputBase, 'value' | 'register'>, IErrorBase, Partial<Pick<IElement, 'paint'>> { }

export default function ComponentItemFeatured(props: IItemFeatured): Component {
    const { value, paint, error, register } = props;

    const { translate } = useAppTranslation();

    const translateValue: string = translate(`notes.form.items.featured.options.${value?.toLocaleLowerCase()}`);

    return (
        <Fragment>
            <ComponentInput type="radio" name="featured" id={value} value={value} descriptionClass="hidden" register={register} />
            <label htmlFor={value} title={translateValue} className={`group border-opacity-50 ${(!error) ? 'dark:border-dark-secondary border-secondary' : 'dark:border-dark-error border-error'} col-span-1 border-[0.1px] rounded-md grid place-items-center overflow-hidden cursor-pointer w-full`}>
                <span title={translateValue} className={`${paint ? 'bg-custom-gradient text-tertiary border-transparent' : ` ${(!error) ? 'dark:text-dark-secondary text-secondary group-hover:bg-custom-gradient group-hover:text-tertiary' : 'dark:text-dark-error text-error dark:group-hover:bg-dark-error group-hover:bg-error dark:group-hover:text-dark-primary group-hover:text-primary'}  `} w-full text-center text-sm tracking-wider font-semibold cursor-pointer py-[5.1px] `}>
                    {translateValue}
                </span>
            </label>
        </Fragment>
    )
}