import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentLink from "@/frontend/components/partials/link";

export default function NotFound(): JSX.Element {
    return (
        <article className="dark:bg-dark-primary bg-primary pt-24 pb-9 h-screen">
            <article className="flex flex-col items-center gap-y-4 max-w-7xl px-2 lg:px-10">
                <div className="flex flex-col place-items-center">
                    <ComponentIcon name="not-found" size={200} view_box="0 0 200 200" />
                    <h3 className="mt-5 dark:text-dark-tertiary text-tertiary text-center tracking-wide text-xl">
                        Parece que te has perdido
                    </h3>
                    <h4 className="dark:text-dark-fifth text-fifth text-center tracking-wide text-md">
                        La página que estás buscando no existe.
                    </h4>
                </div>
                <ComponentLink url={`${process.env.DEVELOPMENT_DOMAIN}/dashboard/main`} title="Volver al inicio de la aplicacion" description_class="border-[0.1px] dark:border-dark-secondary border-secondary px-2 py-1 b rounded-md dark:hover:bg-dark-secondary hover:bg-secondary dark:hover:text-dark-primary hover:text-primary dark:bg-dark-primary bg-primary dark:text-dark-secondary text-secondary text-center text-md tracking-wide">
                    Volver al inicio
                </ComponentLink>
            </article>
        </article>
    )
}