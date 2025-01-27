import Image from "next/image";
import { FaStar } from "react-icons/fa";

import IElement from "@/frontend/interfaces/elements/element";

import ComponentMotion from "@/frontend/components/partials/motion";

interface IItemTestimoniesHome extends Pick<IElement, 'title' | 'subtitle'> {
    url: string
}

export default function ComponentItemTestimoniesHome(props: IItemTestimoniesHome): JSX.Element {
    const { title, subtitle, url } = props;

    return (
        <ComponentMotion type="div" descriptionClass="relative bg-gradient-to-r from-primary to-secondary p-8 rounded-xl shadow-2xl hover:scale-105 transform transition-all duration-500 hover:rotate-y-180">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-25 rounded-xl"></div>
            <div className="relative flex items-center gap-x-6 mb-6">
                <Image src={url} alt={title} width={20} height={20} className="rounded-full w-20 h-20 object-cover border-4 border-white shadow-lg" />
                <div className="flex flex-col items-start">
                    <h3 className="text-2xl font-semibold text-white">
                        {title}
                    </h3>
                    <div className="flex justify-start mt-2 mb-4">
                        {
                            [...Array(5)].map((index: number) => (
                                <FaStar key={index} className={`text-yellow-400 ${index < 4 ? "text-amber-400" : ""}`} />
                            ))
                        }
                    </div>
                    <p className="text-lg text-primary opacity-90">
                        {subtitle}
                    </p>
                </div>
            </div>
        </ComponentMotion>
    )
}