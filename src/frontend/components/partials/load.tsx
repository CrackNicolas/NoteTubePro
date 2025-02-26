"use client"

import { Component } from "@/frontend/types/component";

import useAppTranslation from "@/shared/hooks/translation";

export default function ComponentLoad(): Component {
    const { translate } = useAppTranslation();

    return (
        <div className="absolute inset-0 flex flex-col gap-y-9 justify-center items-center py-[110px] ">
            <div className="loader w-[54px] h-[54px] rounded-full border-[4px] dark:border-seventh  border-secondary dark:after:shadow-none after:shadow-glow-blue animate-loader after:absolute after:w-[85px] after:h-[85px] after:rounded-full after:border-[4px] dark:after:border-seventh dark:after:border-x-transparent after:border-secondary after:border-x-transparent after:translate-x-[-20px] after:translate-y-[-20px] "></div>
            <span className="dark:text-dark-secondary text-gradient tracking-wider">
                {`${translate('loading.messages.default')}...`}
            </span>
        </div>
    )
}