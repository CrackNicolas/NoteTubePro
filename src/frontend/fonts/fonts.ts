import { Roboto } from 'next/font/google'

export const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
    display: 'swap' //Evita que la fuente bloqueé el renderizado inicial
})