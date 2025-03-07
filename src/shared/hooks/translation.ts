import { useTranslation } from "react-i18next";

import { Languages } from "@/shared/enums/languages";

import ITranslation from "@/shared/interfaces/translation";

export default function useAppTranslation(): ITranslation {
    const [t, i18n] = useTranslation("global");

    const update_language = (newlanguage: Languages): void => {
        i18n.changeLanguage(newlanguage);
        localStorage.setItem('language', newlanguage);
    }

    const translate = (chain: string): string => t(chain);

    return { language: i18n.language as Languages, update_language, translate };
}