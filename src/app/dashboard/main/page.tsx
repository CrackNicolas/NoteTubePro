"use client";

import { useCallback, useEffect, useState, useMemo } from "react";

import { Component } from "@/frontend/types/component";
import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import IContext from "@/context/interfaces/context";
import useAppContext from "@/context/hooks/context";

import { RolUser } from "@/shared/enums/user/rol";
import { ItemsMain } from "@/frontend/constant/dashboard";
import { PropsItemsDashboard } from "@/frontend/types/props";

import { httpRequest } from "@/shared/logic/requests";

import ComponentDashboardMain from "@/frontend/components/layouts/dashboard/main";

export default function Dashboard(): Component {
	const { session }: IContext = useAppContext();
	const [items, setItems] = useState<PropsItemsDashboard[]>([]);

	const userId = useMemo(() => session.value.id, [session.value.id]); // Evita que el `useCallback` se regenere innecesariamente

	const loadItems = useCallback(async (): Promise<void> => {
		if (!userId) return;

		try {
			const { data } = await httpRequest({ type: "GET", url: `/api/role/${userId}` });

			switch (data.details) {
				case RolUser.ADMIN:
					setItems(prev => (prev.length === ItemsMain.length ? prev : ItemsMain));
					break;
				case RolUser.MEMBER:
					const filteredItems: PropsItemsDashboard[] = ItemsMain.filter((item: PropsItemsDashboard) => item.url !== APP_ROUTES.sessions);
					setItems(prev => (prev.length === filteredItems.length ? prev : filteredItems));
					break;
				default:
					setItems([]);
			}
		} catch (error: unknown) {
			setItems(prev => (prev.length === 0 ? prev : []));
		}
	}, [userId]);

	useEffect(() => {
		if (session.value.user) {
			loadItems();
		}
	}, [session.value.user, loadItems]);

	return <ComponentDashboardMain items={items} />;
}