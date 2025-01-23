import { Component } from "@/frontend/types/component";

import IElement from "@/frontend/interfaces/elements/element";

import { PropsCategory } from "@/context/types/category";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentLoading from "@/frontend/components/layouts/category/list/loading";

interface IItems extends Partial<Pick<IElement, 'paint'>> {
    select: (category: PropsCategory) => Promise<void> | void,
    categorys: PropsCategory[]
}

export default function ComponentItems(props: IItems): Component {
    const { categorys, select, paint = false } = props;

    return (
        <article className="relative pb-16 sm:pb-7 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 w-full">
            {
                (categorys.length === 0) ?
                    <ComponentLoading count={10} />
                    :
                    categorys.map((category: PropsCategory) => {
                        return (
                            <div key={category.title} title={`Categoria ${category.title}`} onClick={() => select(category)} className={`group col-span-1 grid place-items-center h-[100px] rounded-md cursor-pointer dark:hover:bg-dark-secondary hover:bg-secondary transition duration-500 ${paint ? 'dark:hover:bg-dark-secondary hover:bg-secondary dark:bg-dark-primary bg-primary dark:border-dark-secondary border-secondary border-[0.1px]' : `${category.use ? 'dark:bg-dark-secondary bg-secondary' : 'dark:bg-dark-primary bg-primary dark:border-dark-secondary border-secondary border-[0.1px]'}`} `}>
                                <div className="flex flex-col items-center gap-y-1">
                                    <ComponentIcon name={category.icon} size={27} viewBox="0 0 16 16" descriptionClass={`dark:group-hover:text-dark-primary group-hover:text-primary ${paint ? 'dark:hover:text-dark-primary hover:text-primary dark:text-dark-secondary text-secondary' : `${category.use ? 'dark:text-dark-primary text-primary' : 'dark:text-dark-secondary text-secondary'} `} duration-500 group-hover:translate-y-[-5px] cursor-pointer `} />
                                    <span className={`dark:group-hover:text-dark-primary group-hover:text-primary text-lg group-hover:font-bold font-semibold ${paint ? 'dark:hover:text-dark-primary hover:text-primary dark:text-dark-secondary text-secondary' : `${category.use ? 'dark:text-dark-primary text-primary' : 'dark:text-dark-secondary text-secondary'}`} tracking-wider duration-500`}>
                                        {category.title}
                                    </span>
                                </div>
                            </div>
                        )
                    })
            }
        </article>
    )
}