import { Months } from "@/frontend/constant/months";

export function timeElapsed(date: Date): string {
    const fecha: Date = new Date(date);
    const dia: number = fecha.getDate();
    const mes: string = Months[fecha.getMonth()];
    const año: number = fecha.getFullYear();

    return `Creada el ${dia} de ${mes} de ${año}`;
}