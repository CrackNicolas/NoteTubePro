import useAppTranslation from "@/shared/hooks/translation"

export default function ComponentFooterHome(): JSX.Element {
    const {translate} = useAppTranslation();

    return (
        <footer className="mt-16 text-center text-sm opacity-70 dark:opacity-100 text-tertiary dark:text-dark-tertiary">
            <p>© {new Date().getFullYear()} NoteTube. {translate('home.sections.footer.details')}</p>
        </footer>
    )
}