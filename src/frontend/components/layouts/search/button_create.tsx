import { Component } from "@/frontend/types/component";

import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import useAppTranslation from "@/shared/hooks/translation";

import ComponentLink from "@/frontend/components/partials/link";
import ComponentIcon from "@/frontend/components/partials/icon";

interface IButtonCreate {
    response?: boolean
}

export default function ComponentButtonCreate(props: IButtonCreate): Component {
    const { response = true } = props;

    const { translate } = useAppTranslation();

    return (
        <ComponentLink url={APP_ROUTES.notes.init} title={translate('search.nav.buttons.create')} descriptionClass={`group relative flex items-center justify-between gap-x-1 rounded-md px-1.5 bg-custom-gradient border-none py-[2px] dark:hover:bg-dark-primary hover:bg-primary outline-none`}>
            <ComponentIcon name='add' size={20} descriptionClass={`text-primary group-hover:text-tertiary cursor-pointer dark:text-tertiary dark:group-hover:text-primary`} />
            <span className={`${response && 'sm:flex hidden'} group-hover:text-tertiary w-full text-sm transition duration-500 text-primary dark:text-tertiary dark:group-hover:text-primary text-md font-semibold tracking-wider`}>
                {translate('search.nav.buttons.create')}
            </span>
        </ComponentLink>
    )
}