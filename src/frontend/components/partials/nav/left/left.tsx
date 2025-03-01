import { Component } from "@/frontend/types/component";
import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import { changeTopic } from "@/frontend/logic/styles/theme"
import { TypeButtonNav } from "@/frontend/enums/type_item_nav";
import { ThemeName, ThemeTextPresentation } from "@/frontend/types/theme";

import IContext from "@/context/interfaces/context";
import useAppContext from "@/context/hooks/context";
import useAppTranslation from "@/shared/hooks/translation";

import ComponentItemNavLeft from "@/frontend/components/partials/nav/left/item";

interface INavLeft extends Pick<IContext, 'theme' | 'setTheme'> { }

export default function ComponentNavLeft(props: INavLeft): Component {
    const { theme, setTheme } = props;

    const { opacity }: IContext = useAppContext();

    const { translate } = useAppTranslation();

    return (
        <nav className={`${opacity && 'opacity-40'} fixed sm:min-h-screen py-1.5 sm:py-0 bottom-0 w-full sm:top-12 z-50 2xl:w-[50px] sm:w-[40px] dark:bg-tertiary bg-primary`}>
            <div className="flex sm:grid sm:place-items-center">
                <ComponentItemNavLeft url={APP_ROUTES.home} title={translate('menu.left.home')} name="home" />
                <ComponentItemNavLeft url={APP_ROUTES.dashboard.main} title={translate('menu.left.panel')} name="panel" />
                <ComponentItemNavLeft
                    onClick={() => changeTopic({ theme, setTheme })}
                    title={translate(`menu.left.theme.${ThemeTextPresentation[theme].toLocaleLowerCase()}`)}
                    type={TypeButtonNav.THEME}
                    name={`moon-star${(theme === ThemeName.dark) ? '' : '-fill'}`}
                />
            </div>
        </nav>
    )
}