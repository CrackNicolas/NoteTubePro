import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import ComponentIcon from '@/frontend/components/partials/icon';

import { Props_items_select } from "@/frontend/types/props";

type Props = {
    title: string,
    style?: {
        border?: string,
        text?: string,
        bg?: string
    },
    items: Props_items_select[],
    select?: string,
    setSelect: Dispatch<SetStateAction<string | undefined>>
}

export default function ComponentSelect(props: Props): JSX.Element {
    const { title, select, setSelect, items, style = { text: 'dark:text-dark-secondary dark:text-dark-secondary text-secondary', border: 'dark:border-dark-secondary dark:border-dark-secondary border-secondary', bg: 'dark:bg-dark-secondary bg-secondary' } } = props;

    const list = useRef<HTMLUListElement>(null);
    const ref_select = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState<boolean>(false);

    const handle_click_outside = (event: MouseEvent): void => {
        if (ref_select.current && !ref_select.current.contains(event.target as Node)) {
            setOpen(false);
        }
    };

    const option_selected: boolean = (select != (title + '...'));

    const selected = (value: string): void => {
        setOpen(false);
        setSelect((value === title) ? undefined : value);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handle_click_outside);
        return () => document.removeEventListener('mousedown', handle_click_outside);
    }, []);

    return (
        <div ref={ref_select} className='relative flex w-full'>
            <div title={title} onClick={() => setOpen(!open)} className={`flex justify-between items-center dark:bg-dark-primary bg-primary w-full rounded-md border-[0.1px] ${open && 'rounded-b-none'} ${option_selected && 'dark:border-dark-secondary border-secondary'} ${style.border} border-opacity-50 py-1 px-2 cursor-pointer`}>
                <span title={`Seleccionar ${title}`} className={`${option_selected && 'dark:text-dark-secondary text-secondary'} ${style.text} text-md`}>
                    {select}
                </span>
                <ComponentIcon name={open ? 'caret-up' : 'caret-down'} size={20} description_class={`${option_selected && 'dark:text-dark-secondary text-secondary'} ${style?.text} cursor-pointer`} />
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
                    items.map((item: Props_items_select, index: number) => {
                        return (
                            <li key={index} onClick={() => selected(item.value)} title={item.value} className="group flex justify-between items-center dark:hover:bg-dark-secondary hover:bg-secondary px-2 py-1 cursor-pointer">
                                <span className={`text-md font-normal dark:group-hover:text-dark-primary group-hover:text-primary ${style.text}`}>
                                    {item.value}
                                </span>
                                <ComponentIcon name={item.icon.name} size={16} description_class={`dark:group-hover:text-dark-primary group-hover:text-primary ${item.icon.class} cursor-pointer`} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}