'use client'

import { useCallback, useEffect, useState } from "react";

import { Component } from "@/frontend/types/component";
import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import IContext from "@/context/interfaces/context";
import useAppContext from "@/context/hooks/context";

import { RolUser } from "@/shared/enums/user/rol";
import { ItemsMain } from "@/frontend/constant/dashboard"
import { PropsItemsDashboard } from "@/frontend/types/props"

import { httpRequest } from "@/shared/logic/requests";

import ComponentDashboardMain from "@/frontend/components/layouts/dashboard/main";

export default function Dashboard(): Component {
	const { session }: IContext = useAppContext();

	const [items, setItems] = useState<PropsItemsDashboard[]>([]);

	const loadItems = useCallback(async (): Promise<void> => {
		try {
			const { data } = await httpRequest({ type: 'GET', url: `/api/role/${session.value.id}` });

			switch (data.details) {
				case RolUser.ADMIN:
					setItems(ItemsMain);
					break;
				case RolUser.MEMBER:
					const filtered_items: PropsItemsDashboard[] = ItemsMain.filter((item:PropsItemsDashboard) => item.url !== APP_ROUTES.sessions);
					setItems(filtered_items);
					break;
				default:
					setItems([]);
			}
		} catch (error: unknown) {
			setItems([]);
		}
	}, [session.value.id]);

	useEffect(() => {
		if (session.value.user) {
			loadItems();
		}
	}, [session.value.user, loadItems]);

	return <ComponentDashboardMain items={items} />
}