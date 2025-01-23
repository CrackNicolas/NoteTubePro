import { PropsNote } from "@/context/types/note"
import { PropsInputName } from "@/frontend/interfaces/elements/form/input";

const currentDate: Date = new Date();

export const note: PropsNote = {
    _id: '1234',
    title: 'Programando',
    description: 'Realizar configuraciones en la aplicacion',
    category: {
        title: 'Viajes',
        icon: 'plane'
    },
    priority: 'Alta',
    featured: true,
    createdAt: currentDate,
    file: {
        id: '1234',
        name: 'Archivo',
        url: 'url'
    },
    userId: 'ddddd_d2e0jzKi44asdasd2eKJeR'
}

export const notes: PropsNote[] = [
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
        createdAt: currentDate,
        file: {
            id: '1234',
            name: 'Archivo',
            url: 'url'
        },
        userId: 'dddsadsad2e0jzKi44asdasd2eKJeR'
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
        createdAt: new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDay() - 3),
        userId: 'ddsadsadsadd_d2e0jzKi44asdasd2eKJeR'
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
        createdAt: currentDate,
        file: {
            id: '1234',
            name: 'Archivo',
            url: 'url'
        },
        userId: 'dddjdjdjdjdj_d2e0jzKi44asdasd2eKJeR'
    }
]

export const labels: { title: string, name: PropsInputName }[] = [
    { title: "Titulo", name: "title" },
    { title: "Descripcion", name: "description" },
    { title: "¿Destacar nota?", name: "featured" },
    { title: "Prioridad", name: "priority" }
]