import { useRef, useState } from "react";

import { Component } from "@/frontend/types/component";

import IElement from "@/frontend/interfaces/elements/element";
import useMouseDown from "@/frontend/hooks/mousedown";

import { PropsItemsSelect } from "@/frontend/types/props";
import { PropsDispatchString } from "@/frontend/types/dispatch";

import ComponentIcon from '@/frontend/components/partials/icon';

interface ISelect extends Pick<IElement, 'title'> {
    style?: {
        border?: string,
        text?: string,
        bg?: string
    },
    items: PropsItemsSelect[],
    select?: string,
    setSelect: PropsDispatchString
}

export default function ComponentSelect(props: ISelect): Component {
    const { title, select, setSelect, items, style = { text: 'dark:text-dark-secondary dark:text-dark-secondary text-secondary', border: 'dark:border-dark-secondary dark:border-dark-secondary border-secondary', bg: 'dark:bg-dark-secondary bg-secondary' } } = props;

    const list = useRef<HTMLUListElement>(null);
    const refSelect = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState<boolean>(false);

    const handleClickOutside = (event: MouseEvent): void => {
        if (refSelect.current && !refSelect.current.contains(event.target as Node)) {
            setOpen(false);
        }
    };

    useMouseDown({ action: handleClickOutside });

    const optionSelected: boolean = (select != (title + '...'));

    const selected = (value: string): void => {
        setOpen(false);
        setSelect((value === title) ? undefined : value);
    }

    return (
        <div ref={refSelect} className='relative flex w-full'>
            <div title={title} onClick={() => setOpen(!open)} className={`flex justify-between items-center dark:bg-dark-primary bg-primary w-full rounded-md border-[0.1px] ${open && 'rounded-b-none'} ${optionSelected && 'dark:border-dark-secondary border-secondary'} ${style.border} border-opacity-50 py-1 px-2 cursor-pointer`}>
                <span title={`Seleccionar ${title}`} className={`${optionSelected && 'dark:text-dark-secondary text-secondary'} ${style.text} text-md`}>
                    {select}
                </span>
                <ComponentIcon name={open ? 'caret-up' : 'caret-down'} size={20} descriptionClass={`${optionSelected && 'dark:text-dark-secondary text-secondary'} ${style?.text} cursor-pointer`} />
            </div>
            <ul ref={list} title="Lista de opciones" className={`${(!open) && 'hidden'} absolute z-10 mt-[32px] w-full dark:bg-dark-primary bg-primary border-[0.1px] ${style.border} rounded-b-md border-opacity-50`}>
                {
                    select != `${title}...` && (
                        <li onClick={() => selected(`${title}...`)} title={`${title}...`} className="group flex justify-between dark:hover:bg-dark-secondary hover:bg-secondary items-center px-2 py-1 cursor-pointer hover:font-semibold">
                            <span className={`text-md font-normal group-hover:font-semibold dark:group-hover:text-dark-primary group-hover:text-primary ${style.text}`}>
                                {title}...
                            </span>
                        </li>
                    )
                }
                {
                    items.map((item: PropsItemsSelect, index: number) => {
                        return (
                            <li key={index} onClick={() => selected(item.value)} title={item.value} className="group flex justify-between items-center dark:hover:bg-dark-secondary hover:bg-secondary px-2 py-1 cursor-pointer">
                                <span className={`text-md font-normal dark:group-hover:text-dark-primary group-hover:text-primary ${style.text}`}>
                                    {item.value}
                                </span>
                                <ComponentIcon name={item.icon.name} size={16} descriptionClass={`dark:group-hover:text-dark-primary group-hover:text-primary ${item.icon.class} cursor-pointer`} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}