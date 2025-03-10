import { RolUser } from "@/shared/enums/user/rol"

export type PropsSession = {
    id?: string,
    status?: boolean,
    lastTime?: string,
    expiret?: string,
    origin?: {
        ipAdress: string,
        city: string
    },
    user?: PropsUser
}

export type PropsUser = {
    name: string,
    email: string,
    image: string,
    lastSignInAt: Date | null,
    rol: RolUser
}