"use client"

import { Fragment } from "react";

import { Component } from "@/frontend/types/component";

import ILayouts from "@/frontend/interfaces/layouts";
import IContext from "@/context/interfaces/context";

import useAppContext from "@/context/hooks/context";

import ComponentNavTop from "@/frontend/components/partials/nav/top";
import ComponentNavLeft from "@/frontend/components/partials/nav/left/left";

export default function Template({ children }: ILayouts): Component {
    const props: IContext = useAppContext();

    return (
        <Fragment>
            <ComponentNavTop {...props} />
            <ComponentNavLeft theme={props.theme} setTheme={props.setTheme} />
            <main className="relative w-full">
                <section className="mx-auto max-w-7xl px-3 sm:px-10">
                    {children}
                </section>
            </main>
        </Fragment>
    )
}