import { Component } from "@/frontend/types/component";
import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import ComponentMotion from "@/frontend/components/partials/motion";
import ComponentButtonMainHome from "@/frontend/components/layouts/home/button_main";

export default function ComponentAditionalHome(): Component {
    return (
        <ComponentMotion type="section" descriptionClass="mt-16 flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-center text-gradient">
                ¿Estás listo para comenzar?
            </h2>
            <p className="mt-3 text-md sm:text-lg text-center opacity-80 text-tertiary dark:text-dark-tertiary">
                Da el primer paso hacia una experiencia inigualable.
            </p>
            <ComponentButtonMainHome url={APP_ROUTES.dashboard.main} title="Comienza Ahora" />
        </ComponentMotion>
    )
}