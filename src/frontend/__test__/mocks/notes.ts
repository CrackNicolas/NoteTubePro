import { PropsNote } from "@/context/types/note"
import { PropsInputName } from "@/frontend/interfaces/elements/form/input";

const currentDate: Date = new Date();

export const note: PropsNote = {
    _id: '1234',
    title: 'Programando pruebas',
    description: 'Realizar configuraciones en la aplicacion lo antes posible',
    category: {
        title: 'Viajes',
        use: true,
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
        title: 'Titulo de prueba a',
        description: 'Descripcion de prueba a funcionando',
        category: {
            title: 'Viajes',
            use: true,
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
        title: 'Titulo de prueba b',
        description: 'Descripcion de prueba b funcionando',
        category: {
            title: 'Viajes',
            use: true,
            icon: 'plane'
        },
        priority: 'Media',
        featured: false,
        createdAt: new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDay() - 3),
        userId: 'ddsadsadsadd_d2e0jzKi44asdasd2eKJeR'
    },
    {
        _id: '2223',
        title: 'Titulo de prueba c',
        description: 'Descripcion de prueba c funcionando',
        category: {
            title: 'Viajes',
            use: true,
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