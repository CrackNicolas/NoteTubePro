'use client'

import { useCallback, useEffect, useState } from "react";

import { Component } from "@/frontend/types/component";
import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import IContext from "@/context/interfaces/context";
import useAppContext from "@/context/hooks/context";

import { ItemsMain } from "@/frontend/constant/dashboard"
import { PropsItemsDashboard } from "@/frontend/types/props"

import { httpRequest } from "@/backend/logic/requests";

import ComponentDashboardMain from "@/frontend/components/layouts/dashboard/main";

export default function Dashboard(): Component {
	const { session: { id, user } }: IContext = useAppContext();

	const [items, setItems] = useState<PropsItemsDashboard[]>([]);

	const loadItems = useCallback(async (): Promise<void> => {
		try {
			const { data } = await httpRequest({ type: 'GET', url: `/api/role/${id}` });

			switch (data.data) {
				case 'admin':
					setItems(ItemsMain);
					break;
				case 'member':
					const filtered_items = ItemsMain.filter(item => item.url !== APP_ROUTES.sessions);
					setItems(filtered_items);
					break;
				default:
					setItems([]);
			}
		} catch (error: unknown) {
			setItems([]);
		}
	}, [id]);

	useEffect(() => {
		if (user) {
			loadItems();
		}
	}, [user, loadItems]);

	return <ComponentDashboardMain items={items} />
}