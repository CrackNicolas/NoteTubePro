import { Dispatch, SetStateAction } from "react";
import { Theme_name, Props_theme } from "@/frontend/types/props";

type Props = {
    theme: Props_theme;
    setTheme: Dispatch<SetStateAction<Props_theme>>;
}

export function Change_topic(props: Props): void {
    const { theme, setTheme } = props;

    switch (theme) {
        case Theme_name.ligth:
            setTheme(Theme_name.dark);
            localStorage.setItem('theme', Theme_name.dark);
            document.documentElement.classList.remove(Theme_name.ligth);
            document.documentElement.classList.add(Theme_name.dark);
            break;
        case Theme_name.dark:
            setTheme(Theme_name.ligth);
            localStorage.setItem('theme', Theme_name.ligth);
            document.documentElement.classList.remove(Theme_name.dark);
            document.documentElement.classList.add(Theme_name.ligth);
            break;
        default:
            console.error(`unknown topic: ${theme}`);
    }
}
