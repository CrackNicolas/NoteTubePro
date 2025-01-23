import { Component } from "@/frontend/types/component";

import { ComponentSignIn } from "@/frontend/components/services/clerk";

import ComponentLoad from "@/frontend/components/partials/load";

export default function Page(): Component {
    return (
        <article className="grid place-items-center items-center min-h-screen">
            <ComponentLoad/>
            <ComponentSignIn />
        </article>
    )
}