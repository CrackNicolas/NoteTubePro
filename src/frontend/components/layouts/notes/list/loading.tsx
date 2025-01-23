import { Component } from "@/frontend/types/component"

import ILoading from "@/frontend/interfaces/loading"

import ComponentTemplateLoading from "@/frontend/components/partials/template/list/loading"

export default function ComponentLoading({ count }: ILoading): Component {
    return (
        <ComponentTemplateLoading count={count} descriptionClass="group grid grid-cols-9 pl-2.5 py-2" title="Cargando nota">
            <div className="col-span-7 md:col-span-8 flex flex-col gap-y-1 justify-between">
                <span className="dark:bg-dark-tertiary bg-tertiary opacity-20 w-[50%] h-[13px] rounded-full" />
                <span className="dark:bg-dark-tertiary bg-tertiary opacity-20 w-[calc(100%-60px)] h-[12px] rounded-full" />
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col items-end">
                <div className="flex flex-col gap-y-2 items-center w-[80px]">
                    <span className="dark:bg-dark-tertiary bg-tertiary opacity-20 w-[65px] h-[8px] px-1.5 rounded-full" />
                    <div className="flex gap-x-2">
                        <span className="dark:bg-dark-tertiary bg-tertiary opacity-20 w-[17px] h-[17px] px-1.5 rounded-full" />
                        <span className="dark:bg-dark-tertiary bg-tertiary opacity-20 w-[17px] h-[17px] px-1.5 rounded-full" />
                        <span className="dark:bg-dark-tertiary bg-tertiary opacity-20 w-[17px] h-[17px] px-1.5 rounded-full" />
                    </div>
                </div>
            </div>
        </ComponentTemplateLoading>
    )
}