export type PropsCategory = {
    title: string,
    use?: PropsUse[]
    icon: string
}

type PropsUse = {
    value: boolean,
    userId: string
}