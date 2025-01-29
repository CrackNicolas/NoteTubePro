export default function ComponentFooterHome(): JSX.Element {
    return (
        <footer className="mt-16 text-center text-sm opacity-70 dark:opacity-100 text-tertiary dark:text-dark-tertiary">
            <p>© {new Date().getFullYear()} NoteTube. Todos los derechos reservados.</p>
        </footer>
    )
}