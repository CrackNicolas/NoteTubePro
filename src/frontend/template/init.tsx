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
            <main className="max-w-7xl mx-auto">
                <section className="px-3 sm:pl-16 sm:pr-10 2xl:px-10">
                    {children}
                </section>
            </main>
        </Fragment>
    )
}