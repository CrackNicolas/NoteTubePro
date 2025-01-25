import { Component } from "@/frontend/types/component";
import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import IContext from "@/context/interfaces/context";

import { changeTopic } from "@/frontend/logic/styles/theme"

import useAppContext from "@/context/hooks/context";

import ComponentItemNavLeft from "@/frontend/components/partials/nav/left/item";

interface INavLeft extends Pick<IContext, 'theme' | 'setTheme'> { }

export default function ComponentNavLeft(props: INavLeft): Component {
    const { theme, setTheme } = props;

    const { opacity }: IContext = useAppContext();

    return (
        <nav className={`${opacity && 'opacity-40'} fixed sm:min-h-screen py-1 bottom-0 w-full sm:top-12 z-40 2xl:w-[50px] sm:w-[40px] dark:bg-dark-primary bg-primary`}>
            <ul className="flex sm:grid sm:place-items-center">
                <ComponentItemNavLeft url={APP_ROUTES.home} title="Inicio" name="home" />
                <ComponentItemNavLeft url={APP_ROUTES.dashboard.main} title="Panel" name="panel" />
                <ComponentItemNavLeft onClick={() => changeTopic({ theme, setTheme })} title="Tema" name="moon-star" />
            </ul>
        </nav>
    )
}