export type PropsSession = {
    id: string,
    status: boolean,
    lastTime: string,
    expiret: string,
    origin: PropsOrigin,
    user: PropsUser
}

type PropsOrigin = {
    ipAdress: string,
    city: string
}

type PropsUser = {
    name: string,
    email: string,
    image: string,
    rol: string
}