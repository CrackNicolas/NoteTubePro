import { APP_ROUTES } from "@/frontend/constant/app_rutes"

import { PropsItemsDashboard } from "@/frontend/types/props"

export const ItemsMain: PropsItemsDashboard[] = [
    {
        url: APP_ROUTES.sessions,
        icon: "users",
        title: "Registro de actividad de usuarios",
        description: "Monitorea las sesiones y actividades de los usuarios para una mejor gestión."
    },
    {
        url: APP_ROUTES.notes.init,
        icon: "note",
        title: "Crear nota",
        description: "Escribe y guarda tus ideas o recordatorios importantes. Mantén tus notas organizadas."
    },
    {
        url: APP_ROUTES.dashboard.config,
        icon: "setting",
        title: "Configuracion de notas",
        description: "Configura tus notas para mejorar tu experiencia personalizando diversos aspectos."
    },
    {
        url: APP_ROUTES.notes.search,
        icon: "list",
        title: "Mis notas creadas",
        description: "Encuentra rápidamente tus notas con esta funcion y mejora tu productividad en un instante."
    }
]
export const ItemsConfig: PropsItemsDashboard[] = [
    {
        url: APP_ROUTES.notes.category,
        icon: "setting",
        title: "Administracion de categorias",
        description: "Realiza la creacion, edicion, eliminacion y visualizacion de categorias con facilidad."
    }
]