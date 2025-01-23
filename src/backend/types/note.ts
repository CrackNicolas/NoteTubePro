import { PropsCategory } from "@/backend/types/category"

export type PropsNote = {
    title: string,
    description: string,
    category: PropsCategory
    priority: string,
    featured: boolean,
    file: PropsFile,
    userId: string
}

type PropsFile = {
    id: string,
    name: string,
    url: string
}