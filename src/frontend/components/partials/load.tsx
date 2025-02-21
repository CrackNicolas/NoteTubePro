"use client"

import { Component } from "@/frontend/types/component";

import useAppTranslation from "@/shared/hooks/translation";

export default function ComponentLoad(): Component {
    const { translate } = useAppTranslation();

    return (
        <div className="absolute inset-0 flex flex-col gap-y-5 justify-center items-center py-[110px] ">
            <div className="animate-spin rounded-full w-[70px] h-[70px] border-t-[1.5px] border-b-[1.5px] dark:border-dark-secondary border-secondary" />
            <span className="dark:text-dark-secondary text-gradient tracking-wider">
                {`${translate('loading.messages.default')}...`}
            </span>
        </div>
    )
}