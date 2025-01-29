'use client'

import { useEffect, useState } from "react";

import { Component } from "@/frontend/types/component";

import { timeElapsed } from "@/frontend/logic/format_time";
import { PropsItemsDashboard } from "@/frontend/types/props";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentLink from "@/frontend/components/partials/link";

interface IItem {
	props: PropsItemsDashboard
}

export default function ComponentItem({ props }: IItem): Component {
	const { url, icon, title, description } = props;

	const [focus, setFocus] = useState<boolean>(false);
	const [lastTime, setLastTime] = useState<string>('Prueba nuestra funcion');

	const view = (): void => localStorage.setItem(url, JSON.stringify(new Date()));

	useEffect(() => {
		const date: string | null = localStorage.getItem(url);
		setLastTime((date) ? timeElapsed(new Date(JSON.parse(date))) : 'Prueba nuestra funcion');
	}, [url])

	return (
		<ComponentLink url={url} onClick={() => view()} title={title} descriptionClass="flex w-full flex-col items-start justify-between dark:bg-dark-sixth bg-sixth sm:px-4 px-3 py-3 cursor-pointer rounded-md hover:shadow-sm dark:hover:shadow-dark-secondary hover:shadow-secondary transition duration-700" onMouseOver={() => setFocus(true)} onMouseLeave={() => setFocus(false)}>
			<div className="flex items-center justify-between w-full gap-x-4 text-xs pr-1">
				<h6 className="dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-50 hover:opacity-100 transition duration-700">
					{lastTime.replace('Creada', 'Ultima vez')}
				</h6>
				<ComponentIcon name={`${focus ? `${icon + '-fill'}` : icon}`} testid="icon-item" size={20} descriptionClass="dark:text-dark-secondary text-secondary cursor-pointer" />
			</div>
			<div className="group relative">
				<h3 className="line-clamp-1 text-md font-semibold tracking-wider dark:text-dark-secondary text-secondary">
					{title}
				</h3>
				<p className="mt-2 line-clamp-2 text-sm leading-6 dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-50 hover:opacity-100 transition duration-700">
					{description}
				</p>
			</div>
		</ComponentLink>
	)
}