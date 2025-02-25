'use client'

import { useEffect, useState } from "react";

import { Component } from "@/frontend/types/component";

import { timeElapsed } from "@/frontend/logic/format_time";
import { PropsItemsDashboard } from "@/frontend/types/props";

import useAppTranslation from "@/shared/hooks/translation";
import translateLastTime from "@/frontend/logic/translate/format_time";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentLink from "@/frontend/components/partials/link";

interface IItem {
	props: PropsItemsDashboard
}

export default function ComponentItem({ props }: IItem): Component {
	const { url, icon, nameTranslate } = props;

	const { translate } = useAppTranslation();

	const [focus, setFocus] = useState<boolean>(false);
	const [lastTime, setLastTime] = useState<string>(translate('dashboard.details.default'));

	const view = (): void => localStorage.setItem(url, JSON.stringify(new Date()));

	useEffect(() => {
		const date: string | null = localStorage.getItem(url);
		setLastTime((date) ? timeElapsed(new Date(JSON.parse(date))) : translate('dashboard.details.default'));
	}, [url, translate('dashboard.details.default')])

	return (
		<ComponentLink url={url} onClick={() => view()} title={translate(`dashboard.sections.${nameTranslate}.title`)} descriptionClass="group flex w-full flex-col items-start justify-between dark:bg-dark-sixth bg-sixth sm:px-4 px-3 py-3 cursor-pointer dark:shadow-xl rounded-md hover:shadow-sm hover:shadow-secondary transition duration-700" onMouseOver={() => setFocus(true)} onMouseLeave={() => setFocus(false)}>
			<div className="flex items-center justify-between w-full gap-x-4 text-xs pr-1">
				<h6 className="dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-50 hover:opacity-100 transition duration-700">
					{translateLastTime({lastTime: lastTime.replace('Creada', 'Ultima vez'), translate})}
				</h6>
				<ComponentIcon name={`${focus ? `${icon + '-fill'}` : icon}`} testid="icon-item" size={20} descriptionClass={`${focus ? 'dark:text-seventh' : 'dark:text-dark-secondary'} text-secondary dark:text-seventh cursor-pointer`} />
			</div>
			<div className="relative">
				<h3 className="line-clamp-1 text-md font-normal group-hover:font-bold tracking-wide dark:text-gradient dark:text-dark-secondary text-secondary">
					{translate(`dashboard.sections.${nameTranslate}.title`)}
				</h3>
				<p className="mt-0 line-clamp-2 text-sm leading-6 dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-50 hover:opacity-100 transition duration-700">
					{translate(`dashboard.sections.${nameTranslate}.description`)}
				</p>
			</div>
		</ComponentLink>
	)
}