export function timeElapsed(date: Date): string {
    const meses: string[] = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

    const fecha: Date = new Date(date);
    const dia: number = fecha.getDate();
    const mes: string = meses[fecha.getMonth()];
    const año: number = fecha.getFullYear();

    return `Creada el ${dia} de ${mes} de ${año}`;
}