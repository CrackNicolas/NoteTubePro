import IContext from "@/context/interfaces/context";

import { ThemeName } from "@/frontend/types/theme";

interface IChangeTopic extends Pick<IContext, 'theme' | 'setTheme'> {}

export function changeTopic(props: IChangeTopic): void {
    const { theme, setTheme } = props;

    switch (theme) {
        case ThemeName.ligth:
            setTheme(ThemeName.dark);
            localStorage.setItem('theme', ThemeName.dark);
            document.documentElement.classList.remove(ThemeName.ligth);
            document.documentElement.classList.add(ThemeName.dark);
            break;
        case ThemeName.dark:
            setTheme(ThemeName.ligth);
            localStorage.setItem('theme', ThemeName.ligth);
            document.documentElement.classList.remove(ThemeName.dark);
            document.documentElement.classList.add(ThemeName.ligth);
            break;
        default:
            console.error(`unknown topic: ${theme}`);
    }
}
