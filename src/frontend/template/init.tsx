import { Fragment, useContext, useState } from "react";

import { Context } from "@/context/provider";

import ComponentNavTop from "@/frontend/components/partials/nav/top";

import { Props_layouts } from "@/frontend/types/props";

export default function Template({ children }: Props_layouts): JSX.Element {
    const props = useContext(Context);

    const [opacity, setOpacity] = useState<boolean>(false);

    return (
        <Fragment>
            <ComponentNavTop {...props} setOpacity={setOpacity} opacity={opacity} />
            <main className={`relative w-full ${opacity && 'opacity-30'}`}>
                <section className="mx-auto max-w-7xl px-3 sm:px-10">
                    {children}
                </section>
            </main>
        </Fragment>
    )
}