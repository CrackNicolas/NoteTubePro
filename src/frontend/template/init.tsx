"use client"

import { Fragment } from "react";

import { Component } from "@/frontend/types/component";
import { ThemeName } from "@/frontend/types/theme";

import ILayouts from "@/frontend/interfaces/layouts";
import IContext from "@/context/interfaces/context";

import useAppContext from "@/context/hooks/context";

import ComponentNavTop from "@/frontend/components/partials/nav/top";
import ComponentNavLeft from "@/frontend/components/partials/nav/left/left";
import ComponentAnimatedBackground from "@/frontend/components/partials/animate";

export default function Template({ children }: ILayouts): Component {
    const props: IContext = useAppContext();

    return (
        <Fragment>
            {(props.theme === ThemeName.ligth) && <ComponentAnimatedBackground />}
            <ComponentNavTop {...props} />
            <ComponentNavLeft theme={props.theme} setTheme={props.setTheme} />
            <main className="w-full">
                <section className="mx-auto max-w-7xl pl-3 pr-2 2xl:pl-10 sm:pl-[60px] sm:pr-10">
                    {children}
                </section>
            </main>
        </Fragment>
    )
}