"use client";

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import { useEffect, useState } from "react";

import es from "@/shared/i18n/es/global.json";
import en from "@/shared/i18n/en/global.json";

import ILayouts from "@/frontend/interfaces/layouts";

import { Languages } from "@/shared/enums/languages";
import { Component } from "@/frontend/types/component";

export default function ClientOnly({ children }: ILayouts): Component | null {
    const [hasMounted, setHasMounted] = useState<boolean>(false);

    useEffect(() => {
        const storedLanguage = (localStorage.getItem("language") as Languages) ?? Languages.SPANISH;

        if (!i18next.isInitialized) {
            i18next.init({
                interpolation: { escapeValue: false },
                lng: storedLanguage,
                resources: {
                    es: { global: es },
                    en: { global: en },
                },
            });
        } else {
            i18next.changeLanguage(storedLanguage);
        }

        setHasMounted(true);
    }, []);

    if (!hasMounted) return null;

    return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}