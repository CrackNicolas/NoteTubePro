'use client'

import { ReactNode } from "react";

import Link from "next/link";

type Props = {
    url: string,
    title: string,
    description_class: string,
    children: ReactNode,
    onClick?: () => void,
    onMouseOver?: () => void,
    onMouseLeave?: () => void
}

export default function ComponentLink(props: Props): JSX.Element {
    const { url, title, description_class, children, onClick = () => { }, onMouseOver = () => { }, onMouseLeave = () => { } } = props;

    return (
        <Link href={url} onClick={onClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} title={title} rel="noopener noreferrer" className={description_class}>
            {children}
        </Link>
    )
}