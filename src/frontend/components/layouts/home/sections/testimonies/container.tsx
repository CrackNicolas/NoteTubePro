import { Component } from "@/frontend/types/component";

import ComponentMotion from "@/frontend/components/partials/motion";
import ComponentItemTestimoniesHome from "@/frontend/components/layouts/home/sections/testimonies/item";

export default function ComponentTestimoniesHome(): Component {
    return (
        <ComponentMotion type="section" descriptionClass="mt-16  flex flex-col bg-primary dark:bg-dark-primary items-center bg-primary py-16">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gradient">
                Opiniones de Usuarios
            </h2>
            <p className="mt-3 text-md sm:text-lg text-center text-tertiary dark:text-dark-tertiary opacity-60 dark:opacity-100 max-w-xl sm:max-w-2xl">
                Descubre cómo nuestra aplicación ha ayudado a otros a organizar sus ideas y mejorar su productividad.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-7">
                <ComponentItemTestimoniesHome
                    url="https://randomuser.me/api/portraits/men/50.jpg"
                    title="Santiago Ríos"
                    subtitle="Me encanta lo fácil que es gestionar mis notas con imágenes y categorías. ¡Por fin tengo todo organizado sin esfuerzo!"
                />
                <ComponentItemTestimoniesHome
                    url="https://randomuser.me/api/portraits/women/50.jpg"
                    title="Valeria Gómez"
                    subtitle="El sistema de prioridades me ayuda a enfocarme en lo más importante. Nunca había sido tan productiva."
                />
                <ComponentItemTestimoniesHome
                    url="https://randomuser.me/api/portraits/men/60.jpg"
                    title="Fernando López"
                    subtitle="Antes usaba varias apps para organizarme, pero esta lo tiene todo: notas, imágenes, categorías y una interfaz genial."
                />
                <ComponentItemTestimoniesHome
                    url="https://randomuser.me/api/portraits/women/40.jpg"
                    title="Camila Rodríguez"
                    subtitle="La posibilidad de destacar notas y clasificarlas por categorías me ha ahorrado mucho tiempo. ¡Totalmente recomendada!"
                />
            </div>
        </ComponentMotion>
    )
}