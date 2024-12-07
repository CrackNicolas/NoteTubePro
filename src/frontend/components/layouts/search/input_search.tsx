import { useState } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

import ComponentIcon from "@/frontend/components/partials/icon";

type Props = {
    design?: boolean,
    setValue: UseFormSetValue<FieldValues>
}

export default function ComponentInputSearch(props: Props): JSX.Element {
    const { setValue, design = false } = props;

    const [error, setError] = useState<boolean>(false);

    const validation = (value: string): void => {
        if (value == '') {
            setValue('title', value);
            setError(false);
            return;
        }

        const regex = /^[A-Za-z._áéíóúñ0-9]+(?: [A-Za-z._áéíóúñ0-9]+)* ?$/i;
        if (regex.test(value)) {
            setValue('title', value);
        }

        setError(!regex.test(value));
    }

    return (
        <div className="flex items-center sm:w-auto w-full">
            {
                !design && (
                    <div className={`dark:bg-dark-sixth bg-sixth border-[0.1px] ${error ? 'dark:border-dark-error border-error' : 'dark:border-dark-secondary border-secondary'} border-opacity-40 py-[4.5px] px-2 sm:rounded-l-md rounded-l-md`}>
                        <ComponentIcon name="search" description_class={`${error ? 'dark:text-dark-error text-error' : ' dark:text-dark-fifth text-fifth'} mt-[3px]`} size={20} view_box="0 0 24 24" />
                    </div>
                )
            }
            <input
                type="text"
                id="search"
                placeholder="Buscar..."
                onChange={(e) => validation(e.target.value)}
                className={`${design ? 'border-l-[0.1px] rounded-l-md' : 'sm:w-auto border-l-none'} w-full dark:bg-dark-sixth bg-sixth border-y-[0.1px] border-r-[0.1px] ${error ? 'dark:text-dark-error text-error dark:border-dark-error border-error' : 'dark:text-dark-fifth text-fifth dark:border-dark-secondary border-secondary'} border-opacity-40 rounded-r-md outline-none px-2 py-1 dark:placeholder:opacity-100 placeholder:opacity-60 placeholdel:text-sm`}
            />
        </div>
    )
}