import { Component } from "@/frontend/types/component";

import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import ComponentLink from "@/frontend/components/partials/link";
import ComponentIcon from "@/frontend/components/partials/icon";

interface IButtonCreate {
    response?: boolean
}

export default function ComponentButtonCreate(props: IButtonCreate): Component {
    const { response = true } = props;

    return (
        <ComponentLink url={APP_ROUTES.notes.init} title="Crear nota" descriptionClass={`group relative flex items-center justify-between gap-x-1 rounded-md text-primary ${response ? 'sm:border-[0.1px] sm:dark:border-dark-secondary sm:border-secondary sm:border-opacity-80 sm:px-1.5 dark:bg-dark-primary bg-primary sm:dark:bg-dark-secondary sm:bg-secondary' : 'border-[0.1px] dark:border-dark-secondary border-secondary border-opacity-80 px-1 dark:bg-dark-secondary bg-secondary'} py-[2px] text-md font-normal hover:font-semibold tracking-wider dark:hover:bg-dark-primary hover:bg-primary dark:hover:text-dark-secondary hover:text-secondary outline-none`}>
            <ComponentIcon name='add' size={20} descriptionClass={`dark:group-hover:text-dark-secondary group-hover:text-secondary ${response ? 'dark:text-dark-fifth text-fifth sm:dark:text-dark-primary sm:text-primary' : 'dark:text-dark:primary text-primary'} cursor-pointer`} />
            <span className={`${response && 'sm:flex hidden'} dark:text-dark-primary text-primary dark:group-hover:text-dark-secondary group-hover:text-secondary w-full text-sm transition duration-500 font-semibold`}>
                Crear nota
            </span>
        </ComponentLink>
    )
}