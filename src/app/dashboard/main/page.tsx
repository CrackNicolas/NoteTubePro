'use client'

import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "@/context/provider";

import ComponentDashboardMain from "@/frontend/components/layouts/dashboard/main";

import { Items_main } from "@/frontend/constant/dashboard"
import { Props_items_dashboard } from "@/frontend/types/props"

import { Request } from "@/backend/logic/requests";

export default function Dashboard(): JSX.Element {
	const { session: { id, user } } = useContext(Context);

	const [items, setItems] = useState<Props_items_dashboard[]>([]);

	const load_items = useCallback(async (): Promise<void> => {
		try {
			const { data } = await Request('GET',`/api/role/${id}`);

			switch (data.data) {
				case 'admin':
					setItems(Items_main);
					break;
				case 'member':
					const filtered_items = Items_main.filter(item => item.url !== '/sessions');
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
			load_items();
		}
	}, [user, load_items]);

	return <ComponentDashboardMain items={items} />
}