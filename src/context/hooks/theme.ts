import { useEffect } from "react";

import { changeTopic } from "@/frontend/logic/styles/theme";
import { PropsTheme, ThemeName } from "@/frontend/types/theme";

import IContext from "@/context/interfaces/context";

interface ITheme extends Pick<IContext, 'setTheme'> { }

export default function useTheme(props: ITheme): void {
    const { setTheme } = props;

    useEffect(() => {
        const storedTheme: ThemeName = localStorage.getItem('theme') as PropsTheme;
        if (storedTheme) {
            changeTopic({ theme: storedTheme, setTheme });
        }
    }, [setTheme])
}