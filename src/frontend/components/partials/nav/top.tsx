'use client'

import { useCallback, useEffect, useRef, useState } from "react";

import { Props_context } from "@/context/types/context";

import ComponentLink from "@/frontend/components/partials/link";
import ComponentIcon from "@/frontend/components/partials/icon";

import { Change_topic } from "@/frontend/logic/theme";

export default function ComponentNavTop(props: Props_context): JSX.Element {
    const { section_current, session, button_sesion, setOpacity, theme, setTheme, path } = props;

    const [focus, setFocus] = useState<string>('');
    const [view_toggle, setView_toggle] = useState<boolean>(false);

    const ref_nav_toggle = useRef<HTMLDivElement>(null);
    const ref_button_user = useRef<HTMLDivElement>(null);
    const ref_button_toggle = useRef<HTMLButtonElement>(null);

    const handle_click_outside = useCallback((event: MouseEvent): void => {
        if (ref_nav_toggle.current && !ref_nav_toggle.current.contains(event.target as Node) && !ref_button_toggle.current?.contains(event.target as Node) && !ref_button_user.current?.contains(event.target as Node)) {
            setView_toggle(false);
            setOpacity(false);
        }
    }, [ref_nav_toggle, ref_button_user, ref_button_toggle, setView_toggle, setOpacity]);

    const handle_resize = useCallback((): void => {
        if (window.innerWidth > 640) {
            setView_toggle(false);
            setOpacity(false);
        }
    }, [setView_toggle, setOpacity]);

    const handle_click_nav = (): void => {
        setView_toggle(!view_toggle);
        setOpacity(!view_toggle);
    }

    const get_focus = (name: string): boolean => (focus === name);

    const restricted_routes = (path?: string): boolean => {
        if (!path) return false;

        const rutes = ["/", "/dashboard/config", "/dashboard/main", "/notes/category"];

        return !rutes.includes(path);
    }

    useEffect(() => {
        window.addEventListener('resize', handle_resize);
        document.addEventListener('mousedown', handle_click_outside);

        return () => {
            window.removeEventListener('resize', handle_resize);
            document.removeEventListener('mousedown', handle_click_outside);
        };
    }, [handle_resize, handle_click_outside]);

    return (
        <nav className="fixed w-full dark:bg-dark-primary bg-primary top-0 mt-[-7px] z-50">
            <article className="mx-auto max-w-7xl px-3 sm:px-10">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-[-4px] flex items-center sm:hidden px-0">
                        <button ref={ref_button_toggle} type="button" title="Boton toggle" onClick={() => handle_click_nav()} className="relative inline-flex items-center justify-center rounded-md py-2 outline-none">
                            <ComponentIcon name={view_toggle ? 'close' : 'toggle'} size={view_toggle ? 32 : 27} view_box="0 0 16 16" description_class="dark:hover:text-dark-secondary hover:text-secondary dark:text-dark-fifth text-fifth cursor-pointer" />
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <ComponentLink url="/" title="Logo" onMouseOver={() => setFocus('logo')} onMouseLeave={() => setFocus('')} description_class="sm:flex hidden flex-shrink-0 items-center">
                            <ComponentIcon testid="icon-home" name={`${get_focus('logo') ? 'logo-fill' : 'logo'}`} size={27} description_class="icon-home text-secondary cursor-pointer" />
                        </ComponentLink>
                        {
                            (session.id && restricted_routes(path)) && (
                                <div className="hidden sm:ml-4 sm:block">
                                    <div className="flex space-x-1">
                                        <ComponentLink url="/dashboard/main" description_class={`${section_current === "/dashboard/main" ? 'dark:text-dark-secondary text-secondary' : ''} dark:hover:text-dark-secondary hover:text-secondary tracking-wider dark:text-dark-fifth text-fifth px-1 py-2 text-md font-normal transition duration-500`} title="Panel">
                                            Panel
                                        </ComponentLink>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="relative inset-y-0 right-0 flex items-center pr-1 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {
                            (path == "/" && !session.id) ?
                                <ComponentLink url="/sign-in" title="Iniciar sesion" description_class="group border dark:border-dark-tertiary border-tertiary dark:hover:border-dark-secondary hover:border-secondary border-[0.1px] px-3 rounded-md flex py-[3px] flex items-center gap-x-1 outline-none transition duration-500">
                                    <ComponentIcon name="user" size={16} description_class="dark:group-hover:text-dark-secondary group-hover:text-secondary dark:text-dark-tertiary text-tertiary cursor-pointer" />
                                    <span className="dark:group-hover:text-dark-secondary group-hover:text-secondary text-sm tracking-wider dark:text-dark-tertiary text-tertiary duration-500">
                                        Iniciar sesion
                                    </span>
                                </ComponentLink>
                                :
                                (session.id) ?
                                    <div ref={ref_button_user} className="flex gap-x-4 rounded-full" title="Usuario">
                                        {button_sesion}
                                    </div>
                                    :
                                    (path != "/sign-in") &&
                                    <span className="animate-pulse dark:bg-dark-secondary bg-secondary opacity-30 rounded-full w-[32px] h-[32px] " />
                        }
                    </div>
                </div>
            </article>
            <article ref={ref_nav_toggle} title="Menu toggle" className={`mx-4 sm:hidden transition-all duration-500 ease-in-out ${view_toggle ? 'max-h-screen opacity-100 scale-100' : 'max-h-0 opacity-0 scale-75'} overflow-hidden`}>
                <div className="space-y-2 px-0.5 py-2">
                    <ComponentLink url="/" title="Inicio" onClick={() => handle_click_nav()} onMouseOver={() => setFocus('home')} onMouseLeave={() => setFocus('')} description_class="group flex justify-between items-center border dark:border-dark-secondary dark:hover:border-dark-secondary hover:border-secondary rounded-md border-1 px-3 py-2">
                        <span className="tracking-wider dark:text-dark-fifth text-fifth text-md font-normal dark:group-hover:text-dark-secondary group-hover:text-secondary transition duration-500">
                            Inicio
                        </span>
                        <ComponentIcon testid="icon-home" name={`${get_focus('home') ? 'home-fill' : 'home'}`} size={23} description_class="icon-home dark:group-hover:text-dark-secondary group-hover:text-secondary dark:text-dark-fifth text-fifth cursor-pointer transition duration-500" />
                    </ComponentLink>
                    <ComponentLink url="/dashboard/main" title="Panel" onClick={() => handle_click_nav()} onMouseOver={() => setFocus('panel')} onMouseLeave={() => setFocus('')} description_class="group flex justify-between items-center border dark:border-dark-secondary dark:hover:border-dark-secondary hover:border-secondary rounded-md border-1 px-3 py-2">
                        <span className="tracking-wider dark:text-dark-fifth text-fifth text-md font-normal dark:group-hover:text-dark-secondary group-hover:text-secondary transition duration-500">
                            Panel
                        </span>
                        <ComponentIcon testid="icon-home" name={`${get_focus('panel') ? 'panel-fill' : 'panel'}`} size={23} description_class="icon-home dark:group-hover:text-dark-secondary group-hover:text-secondary dark:text-dark-fifth text-fifth cursor-pointer transition duration-500" />
                    </ComponentLink>
                    <span title="Cambiar tema" onClick={() => Change_topic({ theme, setTheme })} onMouseOver={() => setFocus('moon')} onMouseLeave={() => setFocus('')} className="group flex justify-between items-center border dark:border-dark-secondary dark:hover:border-dark-secondary hover:border-secondary rounded-md border-1 px-3 py-2 cursor-pointer">
                        <span className="tracking-wider dark:text-dark-fifth text-fifth text-md font-normal dark:group-hover:text-dark-secondary group-hover:text-secondary transition duration-500">
                            Tema
                        </span>
                        <ComponentIcon testid="icon-home" name={`${get_focus('moon') ? 'moon-star-fill' : 'moon-star'}`} size={23} description_class="icon-home dark:group-hover:text-dark-secondary group-hover:text-secondary dark:text-dark-fifth text-fifth cursor-pointer transition duration-500" />
                    </span>
                </div>
            </article>
        </nav>
    );
}