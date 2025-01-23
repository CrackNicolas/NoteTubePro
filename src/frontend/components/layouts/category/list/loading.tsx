import { Component } from "@/frontend/types/component"

import ILoading from "@/frontend/interfaces/loading"

import ComponentTemplateLoading from "@/frontend/components/partials/template/list/loading"

export default function ComponentLoading({ count }: ILoading): Component {
    return (
        <ComponentTemplateLoading count={count} descriptionClass="grid gap-0 place-items-center h-[100px] px-4">
            <span className="rounded-full h-[40px] w-[40px] dark:bg-dark-tertiary bg-tertiary opacity-20" />
            <span className="rounded-full w-full mx-3 h-[20px] dark:bg-dark-tertiary bg-tertiary opacity-20" />
        </ComponentTemplateLoading>
    )
}