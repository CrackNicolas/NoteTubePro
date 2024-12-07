import { Fragment } from "react";
import { FieldError, FieldErrorsImpl, FieldValues, LiteralUnion, Merge, UseFormRegister } from "react-hook-form";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentInput from "@/frontend/components/partials/form/input";

type Props = {
    id: string,
    class_icon: string,
    value?: string,
    paint?: boolean,
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | LiteralUnion<"required", string> | undefined,
    register: UseFormRegister<FieldValues>
}

export default function ComponentItemPriority(props: Props): JSX.Element {
    const { id, class_icon, value, paint, error, register } = props;

    return (
        <Fragment>
            <ComponentInput type="radio" name="priority" id={id} value={value} description_class="hidden" register={register} />
            <label htmlFor={id} title={`${value} prioridad`} className={`group border-opacity-50 ${(!error) ? 'dark:border-dark-secondary border-secondary' : 'dark:border-dark-error border-error'} col-span-1 border-[0.1px] rounded-md flex place-items-center overflow-hidden cursor-pointer`}>
                <ComponentIcon name="arrow" size={20} description_class={`w-[30px] cursor-pointer ${class_icon}`} />
                <span className={` ${paint ? 'dark:bg-dark-secondary bg-secondary dark:text-dark-primary text-primary' : ` ${(!error) ? 'dark:text-dark-secondary text-secondary dark:group-hover:bg-dark-secondary group-hover:bg-secondary dark:group-hover:text-dark-primary group-hover:text-primary' : 'dark:text-dark-error text-error dark:group-hover:bg-dark-error group-hover:bg-error dark:group-hover:text-dark-primary group-hover:text-primary'}  `} w-full text-center text-[14.4px] tracking-wider font-semibold cursor-pointer py-[5.1px] `}>
                    {value}
                </span>
            </label>
        </Fragment>
    )
}