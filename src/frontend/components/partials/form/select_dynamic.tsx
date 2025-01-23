import { Fragment, useEffect, useRef, useState } from "react";

import { Component } from "@/frontend/types/component";

import { PropsCategory } from "@/context/types/category";
import { PropsDispatchCategoryRequired } from "@/frontend/types/dispatch";

import useMouseDown from "@/frontend/hooks/mousedown";

import { IErrorBase } from "@/frontend/interfaces/elements/form/error";

import ISetValue from "@/frontend/interfaces/elements/form/value";
import IInputBase from "@/frontend/interfaces/elements/form/input";
import IClearError from "@/frontend/interfaces/elements/form/cleareErrors";

import { httpRequest } from "@/backend/logic/requests";

import ComponentIcon from '@/frontend/components/partials/icon';

interface ISelect extends Pick<IInputBase, 'required' | 'register'>, ISetValue, IClearError, IErrorBase {
    style?: {
        border?: string,
        text?: string
    },
    selectCategory: PropsCategory,
    setSelectCategory: PropsDispatchCategoryRequired
}

export default function ComponentSelect(props: ISelect): Component {
    const list = useRef<HTMLUListElement>(null);
    const refSelect = useRef<HTMLDivElement>(null);

    const { error, selectCategory, setSelectCategory, register, required, setValue = () => { }, clearErrors = () => { }, style = { border: 'border-secondary', text: 'text-secondary' } } = props;

    const [openCategory, setOpenCategory] = useState<boolean>(false);
    const [categorys, setCategorys] = useState<PropsCategory[]>([]);

    const itemDefault: PropsCategory = {
        title: 'Categoria...'
    }

    const optionSelected: boolean = (selectCategory.title != 'Categoria...');

    const handleClickOutside = (event: MouseEvent): void => {
        if (refSelect.current && !refSelect.current.contains(event.target as Node)) {
            setOpenCategory(false);
        }
    }

    useMouseDown({action: handleClickOutside});

    const selected = (category: PropsCategory): void => {
        setValue('category', category);
        setSelectCategory(category);
        setOpenCategory(false);
        clearErrors('category');
        setCategorys(prev => prev.some((item: PropsCategory) => item.title === itemDefault.title) ? prev : [itemDefault, ...prev]);
    }

    const loadCategorys = async (): Promise<void> => {
        const { data } = await httpRequest({ type: 'GET', url: "/api/categorys/true" });

        if (data.status === 200) {
            setCategorys(data.data);
        }
    }

    useEffect(() => {
        loadCategorys();
    }, []);

    useEffect(() => {
        if (selectCategory.title === 'Categoria...') {
            setValue('category', undefined);
        }
    }, [selectCategory.title, setValue]);

    return (
        <div ref={refSelect} className='relative flex w-full'>
            {
                (categorys.length == 0) ?
                    <div title="Cargando categorias" className={`flex justify-between items-center w-full py-1 px-2 ${style.border} border-[0.1px] border-opacity-50 rounded-md`}>
                        <span className={`${style.text} dark:opacity-100 opacity-70`}>
                            Cargando...
                        </span>
                        <div className='spinner-load-category w-[15px] h-[15px] rounded-full'></div>
                    </div>
                    :
                    <Fragment>
                        <div title="Categoria" onClick={() => setOpenCategory(!openCategory)} {...register('category')} className={`flex justify-between items-center dark:bg-dark-primary bg-primary w-full rounded-md border-[0.1px] ${openCategory && 'rounded-b-none'} ${optionSelected && 'dark:border-dark-secondary border-secondary'} ${!error ? style.border : 'dark:border-dark-error border-error'} border-opacity-50 py-1 px-2 cursor-pointer`}>
                            <span title="Seleccionar categoria" className={`${optionSelected && 'dark:text-dark-secondary text-secondary'} ${!error ? style.text : 'dark:text-dark-error text-error'} text-md`}>
                                {selectCategory.title}
                            </span>
                            <ComponentIcon name={openCategory ? 'caret-up' : 'caret-down'} size={20} descriptionClass={`${optionSelected && 'dark:text-dark-secondary text-secondary'} ${!error ? style.text : 'dark:text-dark-error text-error'} cursor-pointer`} />
                        </div>
                        <ul ref={list} title="Lista de categorias" className={`${(!openCategory) && 'hidden'} absolute z-10 mt-[32px] w-full ${(categorys.length >= 4) && `h-[${categorys.length * 37}px]`} dark:bg-dark-primary bg-primary border-[0.1px] ${!error ? `${style.border} scroll-select` : 'dark:border-dark-error border-error scroll-select-error'} rounded-b-md border-opacity-50 overflow-hidden`}>
                            {
                                categorys.filter((category: PropsCategory) => category.title != selectCategory.title).map(category => {
                                    return (
                                        <li key={category.title} title={category.title} onClick={() => selected(category)} className={`flex justify-between items-center group ${!error ? `${style.text} dark:hover:bg-dark-secondary hover:bg-secondary` : 'dark:text-dark-error text-error dark:hover:bg-dark-error hover:bg-error'} dark:hover:text-dark-primary hover:text-primary px-2 py-1 cursor-pointer hover:font-semibold`}>
                                            <span className="text-md font-normal">
                                                {category.title}
                                            </span>
                                            <ComponentIcon name={category.icon} size={17} viewBox="0 0 16 16" descriptionClass={`dark:group-hover:text-dark-primary group-hover:text-primary ${!error ? style.text : 'dark:text-dark-error text-error'} duration-500 `} />
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