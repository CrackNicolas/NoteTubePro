import { Component } from "@/frontend/types/component";

import ComponentMotion from "@/frontend/components/partials/motion";
import ComponentItemTestimoniesHome from "@/frontend/components/layouts/home/sections/testimonies/item";

export default function ComponentTestimoniesHome(): Component {
    return (
        <ComponentMotion type="section" descriptionClass="mt-16  flex flex-col bg-primary dark:bg-dark-primary items-center bg-primary py-16">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gradient">
                Testimonios Reales
            </h2>
            <p className="mt-3 text-md sm:text-lg text-center text-tertiary dark:text-dark-tertiary opacity-60 dark:opacity-100 max-w-2xl">
                Estos son algunos de los testimonios de usuarios que han mejorado su experiencia con nuestra app.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-7">
                <ComponentItemTestimoniesHome
                    url="https://randomuser.me/api/portraits/men/50.jpg"
                    title="Juan Pérez"
                    subtitle="Gracias a esta aplicación, logré mejorar mi productividad personal y superar mis metas de programación. ¡Nunca pensé que sería tan fácil!"
                />
                <ComponentItemTestimoniesHome
                    url="https://randomuser.me/api/portraits/women/50.jpg"
                    title="María González"
                    subtitle= "La personalización de la aplicación hizo que fuera mucho más fácil adaptarla a mis necesidades. ¡Me ha ayudado a organizar mi tiempo de manera eficiente!"
                />
                <ComponentItemTestimoniesHome
                    url="https://randomuser.me/api/portraits/men/60.jpg"
                    title="Carlos Martínez"
                    subtitle="Una herramienta increíble para mejorar mis proyectos. Todo lo que necesitaba en un solo lugar. ¡Recomendadísima!"
                />
                <ComponentItemTestimoniesHome
                    url="https://randomuser.me/api/portraits/women/40.jpg"
                    title="Lucía Fernández"
                    subtitle="Nunca había encontrado una plataforma tan intuitiva y completa. Me ha ayudado a organizar todos mis proyectos de forma eficaz."
                />
            </div>
        </ComponentMotion>
    )
}