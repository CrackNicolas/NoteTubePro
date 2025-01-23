import { Fragment } from "react";

import { Component } from "@/frontend/types/component";
import { IErrorBase } from "@/frontend/interfaces/elements/form/error";

import IElement from "@/frontend/interfaces/elements/element";
import IInputBase from "@/frontend/interfaces/elements/form/input";

import ComponentInput from "@/frontend/components/partials/form/input";

interface IItemFeatured extends Pick<IInputBase, 'value' | 'register'>, IErrorBase, Partial<Pick<IElement, 'paint'>> {}

export default function ComponentItemFeatured(props: IItemFeatured): Component {
    const { value, paint, error, register } = props;

    return (
        <Fragment>
            <ComponentInput type="radio" name="featured" id={value} value={value} descriptionClass="hidden" register={register} />
            <label htmlFor={value} title={`${value?.toLocaleLowerCase()} destacar`} className={`group border-opacity-50 ${(!error) ? 'dark:border-dark-secondary border-secondary' : 'dark:border-dark-error border-error'} col-span-1 border-[0.1px] rounded-md grid place-items-center overflow-hidden cursor-pointer w-full`}>
                <span title={value} className={` ${paint ? 'dark:bg-dark-secondary bg-secondary dark:text-dark-primary text-primary' : ` ${(!error) ? 'dark:text-dark-secondary text-secondary dark:group-hover:bg-dark-secondary group-hover:bg-secondary dark:group-hover:text-dark-primary group-hover:text-primary' : 'dark:text-dark-error text-error dark:group-hover:bg-dark-error group-hover:bg-error dark:group-hover:text-dark-primary group-hover:text-primary'}  `} w-full text-center text-sm tracking-wider font-semibold cursor-pointer py-[5.1px] `}>
                    {value}
                </span>
            </label>
        </Fragment>
    )
}