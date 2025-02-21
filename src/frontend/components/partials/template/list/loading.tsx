import { Fragment } from "react"

import IElement from "@/frontend/interfaces/elements/element";
import ILayouts from "@/frontend/interfaces/layouts";
import useAppTranslation from "@/shared/hooks/translation";

import { Component } from "@/frontend/types/component";

interface ITemplateLoading extends Partial<Pick<IElement, 'title' | 'descriptionClass'>>, ILayouts {
    count: number
}

export default function ComponentTemplateLoading(props: ITemplateLoading): Component {
    const {translate} = useAppTranslation();

    const { children, count, descriptionClass = "", title = `${translate('loading.messages.default')}...` } = props;

    return (
        <Fragment>
            {
                Array.from(Array(count).keys(), n => n + 1).map((index: number) => {
                    return (
                        <div key={index} className={`animate-pulse w-full dark:bg-dark-sixth bg-sixth overflow-hidden rounded-md border-[0.1px] dark:border-dark-tertiary border-tertiary border-opacity-20 ${descriptionClass}`} title={title}>
                            {children}
                        </div>
                    )
                })
            }
        </Fragment>
    )
}