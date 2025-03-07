import { Component } from "@/frontend/types/component";

import IElement from "@/frontend/interfaces/elements/element";
import useAppTranslation from "@/shared/hooks/translation";

import { PropsCategory } from "@/context/types/category";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentLoading from "@/frontend/components/layouts/category/list/loading";

interface IItems extends Partial<Pick<IElement, 'paint'>> {
    select: (category: PropsCategory) => Promise<void> | void,
    categorys: PropsCategory[]
}

export default function ComponentItems(props: IItems): Component {
    const { categorys, select, paint = false } = props;

    const { translate } = useAppTranslation();

    const translateName = (category?: string): string => (category) ? translate(`categories.items.${category.toLocaleLowerCase()}`) : "";

    return (
        <article className="relative pb-10 sm:pb-7 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 w-full">
            {
                (categorys.length === 0) ?
                    <ComponentLoading count={10} />
                    :
                    categorys.map((category: PropsCategory) => {
                        return (
                            <div key={category.title} title={`${translate('categories.default')} ${translateName(category.icon)}`} onClick={() => select(category)} className={`group col-span-1 grid place-items-center h-[100px] rounded-md cursor-pointer dark:hover:bg-dark-secondary hover:bg-custom-gradient hover:border-transparent transition duration-500 ${paint ? 'dark:hover:bg-dark-secondary hover:bg-custom-gradient dark:bg-tertiary bg-primary dark:border-dark-secondary border-secondary border-[0.1px]' : `${category.use ? 'dark:bg-dark-secondary bg-custom-gradient' : 'dark:bg-tertiary bg-primary dark:border-dark-secondary border-secondary border-[0.1px]'}`} `}>
                                <div className="flex flex-col items-center gap-y-1">
                                    <ComponentIcon name={category.icon} size={27} descriptionClass={`group-hover:text-tertiary ${paint ? 'dark:hover:text-seventh dark:text-seventh text-secondary' : `${category.use ? 'dark:text-dark-primary text-primary' : 'dark:text-seventh text-secondary'} `} duration-500 group-hover:translate-y-[-5px] cursor-pointer `} />
                                    <span className={`group-hover:text-tertiary text-lg group-hover:font-bold font-semibold ${paint ? 'dark:hover:text-dark-primary hover:text-primary dark:text-dark-secondary text-secondary' : `${category.use ? 'dark:text-dark-primary text-primary' : 'dark:text-dark-secondary text-secondary'}`} tracking-wider duration-500`}>
                                        {translateName(category.icon)}
                                    </span>
                                </div>
                            </div>
                        )
                    })
            }
        </article>
    )
}