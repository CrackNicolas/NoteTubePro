import { useRef, useState } from "react";

import { Component } from "@/frontend/types/component";

import IElement from "@/frontend/interfaces/elements/element";
import useMouseDown from "@/frontend/hooks/mousedown";
import useAppTranslation from "@/shared/hooks/translation";

import { PropsItemsSelect } from "@/frontend/types/props";
import { PropsDispatchString } from "@/frontend/types/dispatch";

import ComponentIcon from '@/frontend/components/partials/icon';

interface ISelect extends Pick<IElement, 'title'> {
    ruteTranslate: string,
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
    const { ruteTranslate, title, select, setSelect, items, style = { text: 'dark:text-dark-secondary dark:text-dark-secondary text-secondary', border: 'dark:border-dark-secondary dark:border-dark-secondary border-secondary', bg: 'dark:bg-dark-secondary bg-secondary' } } = props;

    const { translate } = useAppTranslation();

    const list = useRef<HTMLUListElement>(null);
    const refSelect = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState<boolean>(false);

    const handleClickOutside = (event: MouseEvent): void => {
        if (refSelect.current && !refSelect.current.contains(event.target as Node)) {
            setOpen(false);
        }
    };

    useMouseDown({ action: handleClickOutside });

    const optionSelected: boolean = (select != title);

    const selectedItem = (value: string): void => {
        setOpen(false);
        setSelect(value);
    }

    const translateValue = (value?: string): string => {
        if (!value) return "";
        if (value === title) return value;
        return translate(`${ruteTranslate}.options.${value.toLocaleLowerCase()}`)
    }

    return (
        <div ref={refSelect} className='relative flex flex-col w-full'>
            <div title={title} onClick={() => setOpen(!open)} className={`flex justify-between items-center dark:bg-tertiary bg-primary w-full rounded-md border-[0.1px] ${open && 'rounded-b-none'} ${optionSelected && 'bg-custom-gradient border-primary text-tertiary'} ${style.border} border-opacity-50 py-1 px-2 cursor-pointer`}>
                <span className={`${optionSelected && 'dark:text-tertiary text-tertiary'} ${style.text} text-md`}>
                    {translateValue(select)}
                </span>
                <ComponentIcon name={open ? 'caret-up' : 'caret-down'} size={20} descriptionClass={`${optionSelected && 'dark:text-tertiary text-tertiary'} ${style?.text} cursor-pointer`} />
            </div>
            <ul ref={list} className={`${(!open) ? 'max-h-0 ' : 'max-h-64 border-[0.1px]'} overflow-hidden transition-all ease-in-out duration-300 mt-[-1px] flex flex-col z-10 w-full dark:bg-tertiary bg-primary ${style.border} rounded-b-md border-opacity-50`}>
                {
                    select != title && (
                        <li onClick={() => selectedItem(title)} title={title} className="group flex justify-between dark:hover:bg-dark-secondary hover:bg-secondary items-center px-2 py-1 cursor-pointer hover:font-semibold">
                            <span className={`text-md font-normal group-hover:font-semibold dark:group-hover:text-dark-primary group-hover:text-primary ${style.text}`}>
                                {title}
                            </span>
                        </li>
                    )
                }
                {
                    items.map((item: PropsItemsSelect, index: number) => {
                        return (
                            <li key={index} onClick={() => selectedItem(item.value)} title={translateValue(item.value)} className="group flex justify-between items-center dark:hover:bg-dark-secondary hover:bg-secondary px-2 py-1 cursor-pointer">
                                <span className={`text-md font-normal dark:group-hover:text-dark-primary group-hover:text-primary ${style.text}`}>
                                    {translateValue(item.value)}
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