import IElement from "@/frontend/interfaces/elements/element";

import { Component } from "@/frontend/types/component";

interface IHeader extends Partial<Pick<IElement, 'title' | 'subtitle'>> {}

export default function ComponentHeader(props: IHeader): Component {
    const { title = '', subtitle = '' } = props;

    return (
        <article className="px-5 mx-auto max-w-2xl">
            <h2 className="text-3xl text-center font-bold tracking-wider dark:text-dark-secondary text-secondary sm:text-4xl">
                {title}
            </h2>
            <p className="mt-2 text-md text-center tracking-wider dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-40 font-thin">
                {subtitle}
            </p>
        </article>
    )
}