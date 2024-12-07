import ComponentLoad from "@/frontend/components/partials/load";

import { ComponentSignIn } from "@/frontend/components/services/clerk";

export default function Page(): JSX.Element {
    return (
        <article className="grid place-items-center items-center h-screen">
            <ComponentLoad/>
            <ComponentSignIn />
        </article>
    )
}