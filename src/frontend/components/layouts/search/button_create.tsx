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
        <ComponentLink url={APP_ROUTES.notes.init} title="Crear nota" descriptionClass={`group relative flex items-center justify-between gap-x-1 rounded-md text-primary px-1.5 bg-custom-gradient border-none py-[2px] text-md font-normal hover:font-semibold tracking-wider dark:hover:bg-dark-primary hover:bg-primary outline-none`}>
            <ComponentIcon name='add' size={20} descriptionClass={`text-primary group-hover:text-tertiary cursor-pointer`} />
            <span className={`${response && 'sm:flex hidden'} group-hover:text-tertiary w-full text-sm transition duration-500 font-semibold`}>
                Crear nota
            </span>
        </ComponentLink>
    )
}