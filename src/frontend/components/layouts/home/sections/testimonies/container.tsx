import ComponentMotion from "@/frontend/components/partials/motion";
import ComponentItemTestimoniesHome from "@/frontend/components/layouts/home/sections/testimonies/item";

export default function ComponentTestimoniesHome(): JSX.Element {
    return (
        <ComponentMotion type="section" descriptionClass="mt-16 flex flex-col items-center bg-black py-16 px-6 rounded-lg">
            <h2 className="text-4xl font-extrabold text-tertiary">
                Testimonios Reales
            </h2>
            <p className="mt-3 text-lg text-center text-gray-300 opacity-85 max-w-3xl">
                Estos son algunos de los testimonios de usuarios que han mejorado su experiencia con nuestra app.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
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