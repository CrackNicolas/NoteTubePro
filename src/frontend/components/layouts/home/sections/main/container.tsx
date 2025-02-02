import { Component } from "@/frontend/types/component";
import { FaCogs, FaRegLightbulb, FaRocket } from "react-icons/fa";

import ComponentMotion from "@/frontend/components/partials/motion";
import ComponentItemMainHome from "@/frontend/components/layouts/home/sections/main/item";

export default function ComponentMainHome(): Component {
    return (
        <ComponentMotion type="section" descriptionClass="mt-16 grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-6">
            <ComponentItemMainHome
                icon={<FaRegLightbulb className="text-secondary dark:text-seventh text-opacity-60 text-4xl sm:text-5xl pb-2 md:mb-4" />}
                title="Organización Inteligente"
                subtitle="Clasifica, prioriza y encuentra tus notas fácilmente."
            />
            <ComponentItemMainHome
                icon={<FaRocket className="text-secondary dark:text-seventh text-opacity-60 text-4xl sm:text-5xl pb-2 md:mb-4" />}
                title="Acceso Rápido"
                subtitle="Busca y edita notas al instante con solo un clic."
            />
            <ComponentItemMainHome
                icon={<FaCogs className="text-secondary dark:text-seventh text-opacity-60 text-4xl sm:text-5xl pb-2 md:mb-4" />}
                title="Flexibilidad Total"
                subtitle="Añade imágenes, categorías y destaca lo más importante."
            />
        </ComponentMotion>
    )
}