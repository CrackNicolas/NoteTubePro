import { Props_note } from "@/context/types/note"

const current_date = new Date();

export const note: Props_note = {
    _id: '1234',
    title: 'Programando',
    description: 'Realizar configuraciones en la aplicacion',
    category: {
        title: 'Viajes',
        icon: 'plane'
    },
    priority: 'Alta',
    featured: true,
    createdAt: current_date,
    file: {
        id: '1234',
        name: 'Archivo',
        url: 'url'
    },
    user_id: 'ddddd_d2e0jzKi44asdasd2eKJeR'
}

export const notes: Props_note[] = [
    {
        _id: '1234',
        title: 'Titulo de prueba, accionando',
        description: 'Descripcion de prueba 1',
        category: {
            title: 'Viajes',
            icon: 'plane'
        },
        priority: 'Baja',
        featured: true,
        createdAt: current_date,
        file: {
            id: '1234',
            name: 'Archivo',
            url: 'url'
        },
        user_id: 'dddsadsad2e0jzKi44asdasd2eKJeR'
    },
    {
        _id: '4321',
        title: 'Titulo de prueba 2',
        description: 'Descripcion de prueba 2',
        category: {
            title: 'Viajes',
            icon: 'plane'
        },
        priority: 'Media',
        featured: false,
        createdAt: new Date(current_date.getFullYear(), current_date.getMonth() - 3, current_date.getDay() - 3),
        user_id: 'ddsadsadsadd_d2e0jzKi44asdasd2eKJeR'
    },
    {
        _id: '2223',
        title: 'Titulo de prueba 3',
        description: 'Descripcion de prueba 3',
        category: {
            title: 'Viajes',
            icon: 'plane'
        },
        priority: 'Alta',
        featured: true,
        createdAt: current_date,
        file: {
            id: '1234',
            name: 'Archivo',
            url: 'url'
        },
        user_id: 'dddjdjdjdjdj_d2e0jzKi44asdasd2eKJeR'
    }
]

export const labels = [
    { title: "Titulo", name: "title" },
    { title: "Descripcion", name: "description" },
    { title: "¿Destacar nota?", name: "featured" },
    { title: "Prioridad", name: "priority" }
]