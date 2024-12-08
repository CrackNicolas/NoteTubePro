import { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from "react";
import { FieldError, FieldErrorsImpl, FieldValues, LiteralUnion, Merge, UseFormClearErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

import ComponentIcon from '@/frontend/components/partials/icon';

import { Props_category } from "@/context/types/category";

import { Request } from "@/backend/logic/requests";
import { validation } from "@/frontend/validations/form";

type Props = {
    style?: {
        border?: string,
        text?: string
    },
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | LiteralUnion<"required", string> | undefined,
    required?: boolean,
    register: UseFormRegister<FieldValues>,
    setValue?: UseFormSetValue<FieldValues>,
    clearErrors?: UseFormClearErrors<FieldValues>,
    select_category: Props_category,
    setSelect_category: Dispatch<SetStateAction<Props_category>>
}

export default function ComponentSelect(props: Props): JSX.Element {
    const list = useRef<HTMLUListElement>(null);
    const ref_select = useRef<HTMLDivElement>(null);

    const { error, select_category, setSelect_category, register, required, setValue = () => { }, clearErrors = () => { }, style = { border: 'border-secondary', text: 'text-secondary' } } = props;

    const [open_category, setOpen_category] = useState<boolean>(false);
    const [categorys, setCategorys] = useState<Props_category[]>([]);

    const item_default: Props_category = {
        title: 'Categoria...'
    }

    const option_selected: boolean = (select_category.title != 'Categoria...');

    const handle_click_outside = (event: MouseEvent): void => {
        if (ref_select.current && !ref_select.current.contains(event.target as Node)) {
            setOpen_category(false);
        }
    };

    const selected = (category: Props_category): void => {
        setValue('category', category);
        setSelect_category(category);
        setOpen_category(false);
        clearErrors('category');
        setCategorys(prev => prev.some((item: Props_category) => item.title === item_default.title) ? prev : [item_default, ...prev]);
    }

    const load_categorys = async (): Promise<void> => {
        const { data } = await Request({ type: 'GET', url: "/api/categorys/true" });

        if (data.status === 200) {
            setCategorys(data.data);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handle_click_outside);
        return () => document.removeEventListener('mousedown', handle_click_outside);
    }, []);

    useEffect(() => {
        load_categorys();
    }, []);

    useEffect(() => {
        if (select_category.title === 'Categoria...') {
            setValue('category', undefined);
        }
    }, [select_category.title, setValue]);

    return (
        <div ref={ref_select} className='relative flex w-full'>
            {
                (categorys.length == 0) ?
                    <div title="Cargando categorias" className={`flex justify-between items-center w-full py-1 px-2 ${style.border} border-[0.1px] border-opacity-50 rounded-md`}>
                        <span className={`${style.text} dark:opacity-100 opacity-70`}>
                            Cargando...
                        </span>
                        <div className='spinner-load-category size-[15px] rounded-full'></div>
                    </div>
                    :
                    <Fragment>
                        <div title="Categoria" onClick={() => setOpen_category(!open_category)} {...register('category', validation('category', required))} className={`flex justify-between items-center dark:bg-dark-primary bg-primary w-full rounded-md border-[0.1px] ${open_category && 'rounded-b-none'} ${option_selected && 'dark:border-dark-secondary border-secondary'} ${!error ? style.border : 'dark:border-dark-error border-error'} border-opacity-50 py-1 px-2 cursor-pointer`}>
                            <span title="Seleccionar categoria" className={`${option_selected && 'dark:text-dark-secondary text-secondary'} ${!error ? style.text : 'dark:text-dark-error text-error'} text-md`}>
                                {select_category.title}
                            </span>
                            <ComponentIcon name={open_category ? 'caret-up' : 'caret-down'} size={20} description_class={`${option_selected && 'dark:text-dark-secondary text-secondary'} ${!error ? style.text : 'dark:text-dark-error text-error'} cursor-pointer`} />
                        </div>
                        <ul ref={list} title="Lista de categorias" className={`${(!open_category) && 'hidden'} absolute z-10 mt-[32px] w-full ${(categorys.length >= 4) && `h-[${categorys.length * 37}px]`} dark:bg-dark-primary bg-primary border-[0.1px] ${!error ? `${style.border} scroll-select` : 'dark:border-dark-error border-error scroll-select-error'} rounded-b-md border-opacity-50 overflow-hidden`}>
                            {
                                categorys.filter((category: Props_category) => category.title != select_category.title).map(category => {
                                    return (
                                        <li key={category.title} title={category.title} onClick={() => selected(category)} className={`flex justify-between items-center group ${!error ? `${style.text} dark:hover:bg-dark-secondary hover:bg-secondary` : 'dark:text-dark-error text-error dark:hover:bg-dark-error hover:bg-error'} dark:hover:text-dark-primary hover:text-primary px-2 py-1 cursor-pointer hover:font-semibold`}>
                                            <span className="text-md font-normal">
                                                {category.title}
                                            </span>
                                            <ComponentIcon name={category.icon} size={17} view_box="0 0 16 16" description_class={`dark:group-hover:text-dark-primary group-hover:text-primary ${!error ? style.text : 'dark:text-dark-error text-error'} duration-500 `} />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </Fragment>
            }
        </div>
    )
}