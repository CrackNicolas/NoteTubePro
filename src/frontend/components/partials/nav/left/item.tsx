import { useState } from "react";

import { Component } from "@/frontend/types/component";

import IElement from "@/frontend/interfaces/elements/element";
import useCurrentPath from "@/frontend/hooks/path";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentLink from "@/frontend/components/partials/link";

interface INavLeft extends Pick<IElement, 'title'>, Partial<Pick<IElement, 'descriptionClass' | 'onClick'>> {
    url?: string,
    name: string
}

export default function ComponentItemNavLeft(props: INavLeft): Component {
    const { url = '', name, title, descriptionClass = 'py-0 sm:py-[10px]', onClick } = props;

    const [focus, setFocus] = useState<string>('');
    
    const path: string = useCurrentPath(true);
    
    const getFocus = (name: string): boolean => (focus === name);
    const paintItem = (item: string): boolean => item === path;

    return (
        <ComponentLink url={url} title={title} descriptionClass="w-full" onClick={onClick}  onMouseOver={() => setFocus(name)} onMouseLeave={() => setFocus('')}>
            <li className={`group grid place-items-center sm:gap-1 cursor-pointer ${descriptionClass}`} title={title}>
                <ComponentIcon name={`${getFocus(name) ? `${name}-fill` : name}`} size={23} descriptionClass={`${paintItem(url)? 'dark:text-dark-secondary text-secondary':'dark:text-dark-tertiary text-tertiary'} dark:group-hover:text-dark-secondary group-hover:text-secondary cursor-pointer`} />
                <span className={`${paintItem(url)? 'dark:text-dark-secondary text-secondary': 'dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-80'} dark:group-hover:text-dark-secondary group-hover:text-secondary dark:font-semibold font-normal text-[11.3px]`}>
                    {title}
                </span>
            </li>
        </ComponentLink>
    )
}