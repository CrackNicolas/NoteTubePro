/* 
    200 - Solicitud cumplida (GET)|(UPDATE)
    201 - Solicitud cumplida de creacion (POST)
    204 - Solicitud cumplida pero no hay que retornar (DELETE)
    400 - Solicitud incumplida debido a que el servidor no puede realizar la operacion 
          debido a que existen errores en los datos que se enviaron (Ej: Key duplicadas)
    401 - Solicitud incumplida debido a que las credenciales son invalidas
    403 - Solicitud incumplida porque el usuario no tiene permisos para acceder a este recurso
    404 - Solicitud incumplida por la no existencia de algun parametro (_id)
    500 - Solicitud incumplida por errores en el servidor
*/

import { RolUser } from "@/shared/enums/user/rol"
import { PropsNote } from "@/context/types/note"
import { PropsSession } from "@/context/types/session"
import { PropsCategory } from "@/context/types/category"

export type PropsResponse = {
    status: HttpStatusCode,
    details?: RolUser | PropsNote[] | PropsNote | PropsCategory[] | PropsSession[]
    info?: { 
        message: string
    }
}

export type HttpStatusCode = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500;