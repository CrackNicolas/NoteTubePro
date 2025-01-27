import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { createContext } from "react";

import { Component } from "@/frontend/types/component";
import { ThemeColors, ThemeName } from "@/frontend/types/theme";

import IContext from "@/context/interfaces/context";
import ILayouts from "@/frontend/interfaces/layouts";
import Template from '@/frontend/template/init';

import { ComponentUserButton } from "@/frontend/components/services/clerk";

interface ITemplateContext extends ILayouts {
    value: IContext
}

export const Context = createContext<IContext>({
    opacity: false,
    setOpacity: () => {},
    sectionCurrent: '',
    session: {
        isSignedIn: false,
        value: {}
    },
    buttonSesion: <ComponentUserButton />,
    theme: ThemeName.ligth,
    setTheme: () => { },
    setNote: () => { }
});

export default function TemplateContext(props: ITemplateContext): Component {
    const { children, value } = props;
    
    return (
        <Context.Provider value={value}>
            <ProgressBar key={value.theme} color={ThemeColors[value.theme]} options={{ showSpinner: false }} />
            <Template>
                {children}
            </Template>
        </Context.Provider>
    )
}