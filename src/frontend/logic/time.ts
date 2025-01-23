export function timeElapsed(fechaEmit: Date): string {
    const fechaCurrent: Date = new Date();
    const formatFechaEmit: Date = new Date(fechaEmit);
    const differenceInMilliseconds: number = fechaCurrent.getTime() - formatFechaEmit.getTime();

    const millisecondsInSecond: number = 1000;
    const secondsInMinute: number = 60;
    const minutesInHour: number = 60;
    const hoursInDay: number = 24;
    const daysInMonth: number = 30;

    const totalSeconds: number = Math.abs(Math.floor(differenceInMilliseconds / millisecondsInSecond));
    const totalMinutes: number = Math.floor(totalSeconds / secondsInMinute);
    const totalHours: number = Math.floor(totalMinutes / minutesInHour);
    const totalDays: number = Math.floor(totalHours / hoursInDay);
    const totalMonths: number = Math.floor(totalDays / daysInMonth);
    const totalYears: number = Math.floor(totalMonths / 12);

    const remainingMonths: number = totalMonths % 12;
    const remainingDays: number = totalDays % daysInMonth;
    const remainingHours: number = totalHours % hoursInDay;
    const remainingMinutes: number = totalMinutes % minutesInHour;
    const remainingSeconds: number = totalSeconds % secondsInMinute;

    const parts: string[] = [
        `${totalYears} año${totalYears !== 1 ? 's' : ''}`,
        `${remainingMonths} mes${remainingMonths !== 1 ? 'es' : ''}`,
        `${remainingDays} día${remainingDays !== 1 ? 's' : ''}`,
        `${remainingHours} hs`,
        `${remainingMinutes} min`,
        `${remainingSeconds} seg`
    ].filter(part => part.startsWith('0') ? false : true);

    return (parts.length === 0) ? 'Recien creada' : `Hace ${parts.join(' ')}`;
}