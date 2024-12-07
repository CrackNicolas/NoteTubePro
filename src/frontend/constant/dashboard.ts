import { Props_items_dashboard } from "@/frontend/types/props"

export const Items_main: Props_items_dashboard[] = [
    {
        url: '/sessions',
        icon: 'users',
        title: 'Registro de actividad de usuarios',
        description: 'Monitorea las sesiones y actividades de los usuarios para una mejor gestión.'
    },
    {
        url: '/notes',
        icon: 'note',
        title: 'Crear nota',
        description: 'Escribe y guarda tus ideas o recordatorios importantes. Mantén tus notas organizadas.'
    },
    {
        url: '/dashboard/config',
        icon: 'setting',
        title: 'Configuracion de notas',
        description: 'Configura tus notas para mejorar tu experiencia personalizando diversos aspectos.'
    },
    {
        url: '/notes/search',
        icon: 'list',
        title: 'Mis notas creadas',
        description: 'Encuentra rápidamente tus notas con esta funcion y mejora tu productividad en un instante.'
    }
]
export const Items_config = [
    {
        url: '/notes/category',
        icon: 'setting',
        title: 'Administracion de categorias',
        description: 'Realiza la creacion, edicion, eliminacion y visualizacion de categorias con facilidad.'
    }
]