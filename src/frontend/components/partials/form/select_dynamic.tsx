import { Fragment, useEffect, useRef, useState } from "react";

import { Component } from "@/frontend/types/component";

import { PropsCategory } from "@/context/types/category";
import { PropsDispatchCategoryRequired } from "@/frontend/types/dispatch";

import useMouseDown from "@/frontend/hooks/mousedown";
import useAppTranslation from "@/shared/hooks/translation";

import { IErrorBase } from "@/frontend/interfaces/elements/form/error";

import ISetValue from "@/frontend/interfaces/elements/form/value";
import IInputBase from "@/frontend/interfaces/elements/form/input";
import IClearError from "@/frontend/interfaces/elements/form/cleareErrors";

import { httpRequest } from "@/shared/logic/requests";

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

    const { translate } = useAppTranslation();

    const { error, selectCategory, setSelectCategory, register, setValue = () => { }, clearErrors = () => { }, style = { border: 'border-secondary', text: 'text-secondary' } } = props;

    const [openCategory, setOpenCategory] = useState<boolean>(false);
    const [categorys, setCategorys] = useState<PropsCategory[]>([]);

    const itemDefault: PropsCategory = {
        title: translate('categories.default')
    }

    const optionSelected: boolean = (selectCategory.title != translate('categories.default'));

    const translateName = (category: PropsCategory) => {
        if (!category.icon) return itemDefault.title;
        return translate(`categories.items.${category.icon?.toLocaleLowerCase()}`);
    }

    const handleClickOutside = (event: MouseEvent): void => {
        if (refSelect.current && !refSelect.current.contains(event.target as Node)) {
            setOpenCategory(false);
        }
    }

    useMouseDown({ action: handleClickOutside });

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
            setCategorys(data.details);
        }
    }

    useEffect(() => {
        setCategorys(prev => prev.filter((item: PropsCategory) => item.icon));
    }, [translate('categories.default')])

    useEffect(() => {
        loadCategorys();
    }, []);

    useEffect(() => {
        if (selectCategory.title === translate('categories.default')) {
            setValue('category', undefined);
        }
    }, [selectCategory.title, setValue]);

    return (
        <div ref={refSelect} className='relative flex flex-col w-full'>
            {
                (categorys.length === 0) ?
                    <div title={translate('loading.messages.categories')} className={`flex justify-between items-center w-full py-1 px-2 ${style.border} border-[0.1px] border-opacity-50 rounded-md`}>
                        <span className={`${style.text}`}>
                            {`${translate('loading.messages.default')}...`}
                        </span>
                        <div className='spinner-load-category bg-custom-gradient w-[15px] h-[15px] rounded-full'></div>
                    </div>
                    :
                    <Fragment>
                        <div title={translate('categories.default')} onClick={() => setOpenCategory(!openCategory)} {...register('category')} className={`flex justify-between items-center dark:bg-tertiary bg-primary w-full rounded-md border-[0.1px] ${openCategory && 'rounded-b-none'} ${optionSelected && 'bg-custom-gradient text-tertiary border-primary'} ${!error ? style.border : 'dark:border-dark-error border-error'} dark:border-opacity-100 border-opacity-50 py-1 px-2 cursor-pointer`}>
                            <span title={translate('categories.select')} className={`${optionSelected && 'dark:text-tertiary text-tertiary'} ${!error ? style.text : 'dark:text-dark-error text-error'} text-md transition duration-500`}>
                                {translateName(selectCategory)}
                            </span>
                            <ComponentIcon name={openCategory ? 'caret-up' : 'caret-down'} size={20} descriptionClass={`${optionSelected && 'dark:text-tertiary text-tertiary'} ${!error ? style.text : 'dark:text-dark-error text-error'} cursor-pointer`} />
                        </div>
                        <ul ref={list} title={translate('categories.list')} className={`${(!openCategory) ? 'max-h-0 ' : 'max-h-64 border-[0.1px]'} overflow-hidden transition-all ease-in-out duration-300 mt-[-1px] z-10 w-full dark:bg-tertiary bg-primary ${!error ? `${style.border}` : 'dark:border-dark-error border-error'} rounded-b-md border-opacity-50 overflow-hidden`}>
                            {
                                categorys.filter((category: PropsCategory) => category.title != selectCategory.title).map((category: PropsCategory) => {
                                    return (
                                        <li key={category.title} title={translateName(category)} onClick={() => selected(category)} className={`flex justify-between items-center group ${!error ? `${style.text} dark:hover:bg-dark-secondary hover:bg-secondary` : 'dark:text-dark-error text-error dark:hover:bg-dark-error hover:bg-error'} dark:hover:text-dark-primary hover:text-primary px-2 py-1 cursor-pointer hover:font-semibold`}>
                                            <span className="text-md font-normal">
                                                {translateName(category)}
                                            </span>
                                            <ComponentIcon name={category.icon} size={17} descriptionClass={`dark:group-hover:text-dark-primary group-hover:text-primary ${!error ? style.text : 'dark:text-dark-error text-error'} duration-500 `} />
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