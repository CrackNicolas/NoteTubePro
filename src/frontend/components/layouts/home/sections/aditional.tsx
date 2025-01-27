import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentLink from "@/frontend/components/partials/link";
import ComponentMotion from "@/frontend/components/partials/motion";

export default function ComponentAditionalHome(): JSX.Element {
    return (
        <ComponentMotion type="section" descriptionClass="mt-16 flex flex-col items-center">
            <h2 className="text-3xl font-bold tracking-wide text-center text-tertiary">
                ¿Estás listo para comenzar?
            </h2>
            <p className="mt-3 text-lg text-center opacity-80 text-tertiary">
                Da el primer paso hacia una experiencia inigualable.
            </p>
            <ComponentLink
                url={APP_ROUTES.home}
                title="Empezar"
                descriptionClass="group mt-6 flex items-center gap-x-2 rounded-md bg-secondary text-primary px-6 py-3 text-lg font-semibold text-black shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-500"
            >
                <ComponentIcon
                    name="box"
                    size={20}
                    descriptionClass="text-primary group-hover:rotate-[360deg] transition-transform duration-700"
                />
                Comienza Ahora
            </ComponentLink>
        </ComponentMotion>
    )
}