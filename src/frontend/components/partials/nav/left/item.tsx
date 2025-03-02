import { useState } from "react";

import { Component } from "@/frontend/types/component";
import { TypeButtonNav } from "@/frontend/enums/type_item_nav";

import IElement from "@/frontend/interfaces/elements/element";
import useCurrentPath from "@/frontend/hooks/path";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentLink from "@/frontend/components/partials/link";

interface INavLeft extends Pick<IElement, 'title'>, Partial<Pick<IElement, 'descriptionClass' | 'onClick'>> {
    url?: string,
    name: string,
    type?: TypeButtonNav
}

export default function ComponentItemNavLeft(props: INavLeft): Component {
    const { url = '', name, title, type = TypeButtonNav.NAV, descriptionClass = 'pb-0 pt-1.5 sm:py-[10px]', onClick } = props;

    const [focus, setFocus] = useState<string>('');

    const path: string = useCurrentPath(true);

    const getNameIcon = (name: string): string => {
        switch(type){
            case TypeButtonNav.THEME: return name;
            case TypeButtonNav.LANGUAGE:
            break;
        }

        return (focus === name) ? `${name}-fill` : name;
    }

    const paint: boolean = (url === path);

    const paintItem = (): string => {
        return (paint) ? 'dark:text-seventh text-secondary' : 'dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-80';
    }

    return (
        <ComponentLink url={url} title={title} descriptionClass="w-full" onClick={onClick} onMouseOver={() => setFocus(name)} onMouseLeave={() => setFocus('')}>
            <div className={`sm:border-none border-t-[2px] ${paint ? 'border-t-secondary':'border-t-transparent'} sm:w-auto w-[50px] rounded-sm sm:mx-0 mx-auto group grid place-items-center sm:gap-1 cursor-pointer ${descriptionClass}`} title={title}>
                <ComponentIcon name={getNameIcon(name)} size={23} viewBox="0 0.2 16 16" descriptionClass={`${paintItem()} dark:group-hover:text-seventh group-hover:text-secondary cursor-pointer`} />
                <span className={`${paintItem()} dark:group-hover:text-seventh group-hover:text-secondary dark:font-semibold font-normal text-[11.3px] transition duration-500 `}>
                    {title}
                </span>
            </div>
        </ComponentLink>
    )
}