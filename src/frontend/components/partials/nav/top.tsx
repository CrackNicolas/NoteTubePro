'use client'

import { useRef, useState } from "react";

import { Component } from "@/frontend/types/component";
import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import IContext from "@/context/interfaces/context";
import useMouseDown from "@/frontend/hooks/mousedown";
import useCurrentPath from "@/frontend/hooks/path";

import ComponentLink from "@/frontend/components/partials/link";
import ComponentIcon from "@/frontend/components/partials/icon";

export default function ComponentNavTop(props: IContext): Component {
    const { session, buttonSesion, setOpacity, opacity } = props;

    const path: string = useCurrentPath(true);

    const [focus, setFocus] = useState<string>('');

    const refUserButton = useRef<HTMLDivElement>(null);

    const getFocus = (name: string): boolean => (focus === name);

    const handleClickOutside = (event: MouseEvent): void => {
        if (refUserButton.current && !refUserButton.current.contains(event.target as Node)) {
            setOpacity(false);
        }
    }

    useMouseDown({ action: handleClickOutside });

    return (
        <nav className="fixed w-full dark:bg-dark-primary bg-primary top-0 mt-[-7px] z-50">
            <article className="mx-auto max-w-7xl pl-3 pr-2 2xl:pl-10 sm:pl-[60px] sm:pr-10">
                <div className="relative flex gap-x-3 h-16 items-center justify-between">
                    <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                        <ComponentLink url={APP_ROUTES.home} title="Logo" onMouseOver={() => setFocus('logo')} onMouseLeave={() => setFocus('')} descriptionClass="flex gap-x-2 items-center">
                            <ComponentIcon testid="icon-home" name={`${getFocus('logo') ? 'logo-fill' : 'logo'}`} size={24} descriptionClass="icon-home dark:text-dark-secondary text-secondary cursor-pointer" />
                            <strong className="dark:text-dark-tertiary text-tertiary text-lg">
                                NoteTube
                            </strong>
                        </ComponentLink>
                    </div>
                    <div className="relative inset-y-0 right-0 flex items-center pr-1 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {
                            (path != APP_ROUTES.init && path != APP_ROUTES.signIn && !session.value.user) && (
                                <span className="absolute right-0 animate-pulse dark:bg-dark-secondary bg-secondary opacity-30 rounded-full w-[28px] h-[28px] " />
                            )
                        }
                        {
                            (path == APP_ROUTES.init && !session.value.user) ?
                                <ComponentLink url={APP_ROUTES.signIn} title="Iniciar sesion" descriptionClass="group border dark:border-dark-tertiary border-tertiary dark:hover:border-dark-secondary hover:border-secondary border-[0.1px] px-3 rounded-md flex py-[3px] flex items-center gap-x-1 outline-none transition duration-500">
                                    <ComponentIcon name="user" size={16} descriptionClass="dark:group-hover:text-dark-secondary group-hover:text-secondary dark:text-dark-tertiary text-tertiary cursor-pointer" />
                                    <span className="dark:group-hover:text-dark-secondary group-hover:text-secondary text-sm tracking-wider dark:text-dark-tertiary text-tertiary duration-500">
                                        Iniciar sesion
                                    </span>
                                </ComponentLink>
                                :
                                (session.value.id) && (
                                    <div ref={refUserButton} onClick={() => setOpacity(!opacity)} className="flex gap-x-4 rounded-full" title="Usuario">
                                        {buttonSesion}
                                    </div>
                                )
                        }
                    </div>
                </div>
            </article>
        </nav>
    );
}