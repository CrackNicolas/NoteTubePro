import { Component } from "@/frontend/types/component"

import ILoading from "@/frontend/interfaces/loading"

import ComponentTemplateLoading from "@/frontend/components/partials/template/list/loading"

export default function ComponentLoading({ count }: ILoading): Component {
    return (
        <ComponentTemplateLoading count={count} descriptionClass="flex gap-3 p-3">
            <span className="min-w-[30px] min-h-[30px] size-[30px] rounded-full dark:bg-dark-tertiary bg-tertiary opacity-20" />
            <div className="flex flex-col w-[calc(100%-30px)] gap-2.5">
                <span className="w-[calc(100%-50px)] h-[15px] dark:bg-dark-tertiary bg-tertiary opacity-20 rounded-full" />
                <span className="w-[calc(100%-140px)] h-[15px] dark:bg-dark-tertiary bg-tertiary opacity-20 rounded-full" />
            </div>
        </ComponentTemplateLoading>
    )
}