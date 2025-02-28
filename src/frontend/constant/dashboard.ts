import { APP_ROUTES } from "@/frontend/constant/app_rutes"

import { PropsItemsDashboard } from "@/frontend/types/props"

export const ItemsMain: PropsItemsDashboard[] = [
    {
        url: APP_ROUTES.sessions,
        icon: "users",
        nameTranslate: "sessions"
    },
    {
        url: APP_ROUTES.notes.init,
        icon: "note",
        nameTranslate: "create_note"
    },
    {
        url: APP_ROUTES.notes.search,
        icon: "list",
        nameTranslate: "list_notes"
    },
    {
        url: APP_ROUTES.dashboard.config,
        icon: "setting",
        nameTranslate: "note_settings"
    },
]
export const ItemsConfig: PropsItemsDashboard[] = [
    {
        url: APP_ROUTES.notes.category,
        icon: "setting",
        nameTranslate: "category_management"
    }
]