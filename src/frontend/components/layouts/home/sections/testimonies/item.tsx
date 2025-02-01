import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Component } from "@/frontend/types/component";

import IElement from "@/frontend/interfaces/elements/element";
import ComponentMotion from "@/frontend/components/partials/motion";

interface IItemTestimoniesHome extends Pick<IElement, 'title' | 'subtitle'> {
    url: string
}

export default function ComponentItemTestimoniesHome(props: IItemTestimoniesHome): Component {
    const { title, subtitle, url } = props;

    return (
        <ComponentMotion type="div" descriptionClass="relative pt-3 sm:pt-4 pb-0 px-3 bg-sixth dark:bg-dark-primary rounded-xl shadow-2xl">
            <div className="relative flex items-center gap-x-4 mb-6">
                <Image src={url} alt={title} width={20} height={20} className="rounded-full w-12 h-12 object-cover sm:border-1 border-white shadow-lg" />
                <div className="flex flex-col items-start">
                    <h3 className="text-lg sm:text-xl font-semibold text-tertiary dark:text-dark-tertiary ">
                        {title}
                    </h3>
                    <div className="flex justify-start mt-1 mb-3">
                        {
                            [...Array(5)].map((_, index: number) => (
                                <FaStar key={index} className="text-yellow-400 w-3 sm:w-auto h-3 sm:h-auto " />
                            ))
                        }
                    </div>
                    <p className="text-sm text-tertiary dark:text-dark-tertiary line-clamp-5">
                        {subtitle}
                    </p>
                </div>
            </div>
        </ComponentMotion>
    )
}