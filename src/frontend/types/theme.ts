export enum ThemeName {
    dark = "dark",
    ligth = "ligth",
}

export const ThemeColors = {
    [ThemeName.dark]: "#1F2937",
    [ThemeName.ligth]: "#00ffff",
}

export const ThemeTextPresentation = {
    [ThemeName.dark]: "Claro",
    [ThemeName.ligth]: "Oscuro"
}

export type PropsTheme = ThemeName;