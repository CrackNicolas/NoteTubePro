import { PropsCategory } from "@/context/types/category"

export type PropsNote = {
    _id?: string,
    title: string,
    description: string,
    category: PropsCategory,
    priority: string,
    featured: boolean
    file?: {
        id: string,
        name: string,
        url: string
    },
    userId: string,
    createdAt: Date,
}
export type PropsDeleteNote = {
    _id?: string,
    file?: string
}