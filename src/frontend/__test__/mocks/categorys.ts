import { PropsCategory } from "@/context/types/category";

export const categorys: PropsCategory[] = [
    {
        title: 'Viajes',
        use: true,
        icon: 'plane'
    },
    {
        title: 'Estudios',
        use: false,
        icon: 'studies'
    },
    {
        title: 'Proyectos',
        use: true,
        icon: 'proyects'
    },
    {
        title: 'Musica',
        use: false,
        icon: 'music'
    },
    {
        title: 'Otros',
        use: true,
        icon: 'others'
    }
]
export const category: PropsCategory = {
    title: 'Viajes',
    use: true,
    icon: 'plane'
}