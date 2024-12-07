import { Fragment, ReactNode } from "react"

type Props = {
    count: number,
    title?: string,
    children: ReactNode,
    description_class?: string
}

export default function ComponentTemplateLoading(props: Props): JSX.Element {
    const { children, count, description_class = "", title = 'Cargando...' } = props;

    return (
        <Fragment>
            {
                Array.from(Array(count).keys(), n => n + 1).map((index: number) => {
                    return (
                        <div key={index} className={`animate-pulse w-full dark:bg-dark-sixth bg-sixth overflow-hidden rounded-md border-[0.1px] dark:border-dark-tertiary border-tertiary border-opacity-20 ${description_class}`} title={title}>
                            {children}
                        </div>
                    )
                })
            }
        </Fragment>
    )
}