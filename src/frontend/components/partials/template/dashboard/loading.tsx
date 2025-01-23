import { Component } from "@/frontend/types/component";

import ILoading from "@/frontend/interfaces/loading";

import ComponentTemplateLoading from "@/frontend/components/partials/template/list/loading";

export default function ComponentLoading({ count }: ILoading): Component {
    return (
        <ComponentTemplateLoading count={count}>
            <div className="flex w-full flex-col items-start justify-between sm:px-4 px-3 pt-3 pb-4">
                <div className="flex items-center justify-between w-full gap-x-4 text-xs pr-1 mb-3">
                    <span className="rounded-full w-[calc(85%-40px)] h-[11.5px] dark:bg-dark-tertiary bg-tertiary opacity-20" />
                    <span className="rounded-full w-[25px] h-[25px] dark:bg-dark-tertiary bg-tertiary opacity-20" />
                </div>
                <div className="flex w-full flex-col gap-4">
                    <span className="rounded-full w-full h-[14px] dark:bg-dark-tertiary bg-tertiary opacity-20" />
                    <div className="flex flex-col gap-2">
                        <span className="rounded-full w-[90%] h-[12.5px] dark:bg-dark-tertiary bg-tertiary opacity-20" />
                        <span className="rounded-full w-[50%] h-[12.5px] dark:bg-dark-tertiary bg-tertiary opacity-20" />
                    </div>
                </div>
            </div>
        </ComponentTemplateLoading>
    )
}