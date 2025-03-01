import { Component } from "@/frontend/types/component";

import useAppTranslation from "@/shared/hooks/translation";

import ComponentMotion from "@/frontend/components/partials/motion";
import ComponentItemTestimoniesHome from "@/frontend/components/layouts/home/sections/testimonies/item";

export default function ComponentTestimoniesHome(): Component {
    const { translate } = useAppTranslation();

    return (
        <ComponentMotion type="section" descriptionClass="mt-16  flex flex-col items-center dark:bg-tertiary bg-primary py-16">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gradient">
                {translate('home.sections.testimonies.title')}
            </h2>
            <p className="mt-3 text-md sm:text-lg text-center text-tertiary dark:text-dark-tertiary opacity-60 dark:opacity-100 max-w-xl sm:max-w-2xl">
                {translate('home.sections.testimonies.subtitle')}
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-7">
                <ComponentItemTestimoniesHome
                    url="https://randomuser.me/api/portraits/men/50.jpg"
                    title="Santiago Ríos"
                    subtitle={translate('home.sections.testimonies.items.description_1')}
                />
                <ComponentItemTestimoniesHome
                    url="https://randomuser.me/api/portraits/women/50.jpg"
                    title="Valeria Gómez"
                    subtitle={translate('home.sections.testimonies.items.description_2')}
                />
                <ComponentItemTestimoniesHome
                    url="https://randomuser.me/api/portraits/men/60.jpg"
                    title="Fernando López"
                    subtitle={translate('home.sections.testimonies.items.description_3')}
                />
                <ComponentItemTestimoniesHome
                    url="https://randomuser.me/api/portraits/women/40.jpg"
                    title="Camila Rodríguez"
                    subtitle={translate('home.sections.testimonies.items.description_4')}
                />
            </div>
        </ComponentMotion>
    )
}