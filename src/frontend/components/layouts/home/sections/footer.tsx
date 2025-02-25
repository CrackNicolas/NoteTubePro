import useAppTranslation from "@/shared/hooks/translation"

export default function ComponentFooterHome(): JSX.Element {
    const { translate } = useAppTranslation();

    return (
        <footer className="mt-16 mb-3 sm:mb-0 opacity-70 dark:opacity-100">
            <p className="text-sm text-tertiary dark:text-dark-tertiary text-center">
                © {new Date().getFullYear()} NoteTube. {translate('home.sections.footer.details')}
            </p>
        </footer>
    )
}