'use client'

import Link from "next/link";

import { Component } from "@/frontend/types/component";

import IElement from "@/frontend/interfaces/elements/element";

interface ILink extends Pick<IElement, 'title' |'children' | 'descriptionClass' | 'onClick' | 'onMouseLeave' | 'onMouseOver'> {
    url: string
}

export default function ComponentLink(props: ILink): Component {
    const { url, title, descriptionClass, children, onClick = () => { }, onMouseOver = () => { }, onMouseLeave = () => { } } = props;

    return (
        <Link href={url} onClick={onClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} title={title} rel="noopener noreferrer" className={`outline-none ${descriptionClass}`}>
            {children}
        </Link>
    )
}