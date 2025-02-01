import { Component } from "@/frontend/types/component";
import { ComponentSignIn } from "@/frontend/components/services/clerk";

import ComponentLoad from "@/frontend/components/partials/load";

export default function Page(): Component {
    return (
        <article className="grid place-items-center mt-[-20px] sm:mt-0 min-h-screen">
            <ComponentLoad/>
            <ComponentSignIn />
        </article>
    )
}