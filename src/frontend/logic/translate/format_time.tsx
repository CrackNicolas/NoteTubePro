"use client"

import { Months } from "@/frontend/constant/months";

import ITranslation from "@/shared/interfaces/translation";

interface ITranslateLastTime extends Pick<ITranslation, 'translate'> {
    lastTime: string
}

export default function translateLastTime({ lastTime, translate }: ITranslateLastTime): string {

    Months.forEach((month: string) => {
        const regex: RegExp = new RegExp(`\\b${month}\\b`, "gi");
        lastTime = lastTime.replaceAll(regex, translate(`format_time.months.${month}`));
    })

    return lastTime
        .replaceAll("Creada", translate('format_time.prefixes.text_1'))
        .replaceAll("Recien creada", translate('time.init'))
        .replaceAll("Hace", translate('time.create'))
        .replaceAll("año", translate('time.prefixes.año'))
        .replaceAll("mes", translate('time.prefixes.mes'))
        .replaceAll("día", translate('time.prefixes.dia'))
        .replaceAll("seg", translate('time.prefixes.seg'))
        .replaceAll("Ultima vez", translate('format_time.prefixes.text_4'))
        .replaceAll("el", translate('format_time.prefixes.text_2'))
        .replaceAll("de", translate('format_time.prefixes.text_3'))
}