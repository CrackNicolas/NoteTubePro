'use client'

import { useEffect, useState } from "react";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentLink from "@/frontend/components/partials/link";

import { Time_elapsed } from "@/frontend/logic/format_time";
import { Props_items_dashboard } from "@/frontend/types/props";

export default function ComponentItem(props: Props_items_dashboard): JSX.Element {
	const { url, icon, title, description } = props;

	const [focus, setFocus] = useState<boolean>(false);
	const [last_time, setLast_time] = useState<string>('Prueba nuestra funcion');

	const view = (): void => localStorage.setItem(url, JSON.stringify(new Date()));

	useEffect(() => {
		const date = localStorage.getItem(url);
		setLast_time((date) ? Time_elapsed(new Date(JSON.parse(date))) : 'Prueba nuestra funcion');
	}, [url])

	return (
		<ComponentLink url={url} onClick={() => view()} title={title} description_class="flex w-full flex-col items-start justify-between dark:bg-dark-sixth bg-sixth sm:px-4 px-3 py-3 cursor-pointer rounded-md hover:shadow-sm dark:hover:shadow-dark-secondary hover:shadow-secondary transition duration-700" onMouseOver={() => setFocus(true)} onMouseLeave={() => setFocus(false)}>
			<div className="flex items-center justify-between w-full gap-x-4 text-xs pr-1">
				<h6 className="dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-50 hover:opacity-100 transition duration-700">
					{last_time.replace('Creada', 'Ultima vez')}
				</h6>
				<ComponentIcon name={`${focus ? `${icon + '-fill'}` : icon}`} testid="icon-item" size={20} description_class="dark:text-dark-secondary text-secondary cursor-pointer" />
			</div>
			<div className="group relative">
				<h3 className="line-clamp-1 text-lg font-normal hover:font-semibold tracking-wide dark:text-dark-secondary text-secondary">
					{title}
				</h3>
				<p className="mt-2 line-clamp-2 text-sm leading-6 dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-50 hover:opacity-100 transition duration-700">
					{description}
				</p>
			</div>
		</ComponentLink>
	)
}