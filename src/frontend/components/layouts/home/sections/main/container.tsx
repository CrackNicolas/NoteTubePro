import { FaCogs, FaRegLightbulb, FaRocket } from "react-icons/fa";

import ComponentMotion from "@/frontend/components/partials/motion";
import ComponentItemMainHome from "@/frontend/components/layouts/home/sections/main/item";

export default function ComponentMainHome(): JSX.Element {
    return (
        <ComponentMotion type="section" descriptionClass="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 px-6">
            <ComponentItemMainHome
                icon={<FaRegLightbulb className="text-secondary text-5xl mb-4" />}
                title="Creatividad"
                subtitle="Soluciones innovadoras para cada desafío."
            />
            <ComponentItemMainHome
                icon={<FaRocket className="text-secondary text-5xl mb-4" />}
                title="Velocidad"
                subtitle="Rendimiento superior sin comprometer la calidad."
            />
            <ComponentItemMainHome
                icon={<FaCogs className="text-secondary text-5xl mb-4" />}
                title="Personalización"
                subtitle="Diseñada para adaptarse a tus necesidades únicas."
            />
        </ComponentMotion>
    )
}