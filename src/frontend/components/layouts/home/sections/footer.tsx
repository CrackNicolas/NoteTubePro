export default function ComponentFooterHome(): JSX.Element {
    return (
        <footer className="mt-16 text-center text-sm opacity-70 text-tertiary">
            <p>© {new Date().getFullYear()} Tu Página Web. Todos los derechos reservados.</p>
        </footer>
    )
}