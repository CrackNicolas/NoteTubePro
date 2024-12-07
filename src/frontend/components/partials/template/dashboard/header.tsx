type Props = {
    title?: string,
    subtitle?: string
}

export default function ComponentHeader(props: Props): JSX.Element {
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