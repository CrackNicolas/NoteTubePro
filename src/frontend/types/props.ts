import { ReactNode } from "react"

export type Props_layouts = {
    children: ReactNode
}
export type Props_params_search = {
    [key: string]: any
}
export type Props_items_select = {
    value: string,
    icon: {
        name: string,
        class: string
    }
}
export type Props_items_dashboard = {
    url: string,
    icon: string,
    title: string,
    description: string
}
export type Props_loading_notes = {
    value: boolean,
    icon?: string,
    description?: string,
    button?: boolean
}

export enum Theme_name {
    dark = "dark",
    ligth = "ligth",
}

export const ThemeColors = {
    [Theme_name.dark]: "#1F2937",
    [Theme_name.ligth]: "#00ffff",
}

export type Props_theme = Theme_name;