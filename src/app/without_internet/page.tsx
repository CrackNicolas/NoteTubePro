import ComponentIcon from '@/frontend/components/partials/icon'
import ComponentLink from '@/frontend/components/partials/link'

export default function WithoutInternet(): JSX.Element {
    return (
        <article className="h-screen dark:bg-dark-primary bg-primary pt-24 pb-9">
            <article className="flex flex-col items-center gap-y-4 max-w-7xl px-2 lg:px-10">
                <div className="flex flex-col place-items-center">
                    <ComponentIcon name="without_internet" size={250} view_box="0 0 192 195" />
                    <h2 className="mt-5 dark:text-dark-tertiary text-tertiary text-center tracking-wide text-xl">
                        Conéctate a Internet
                    </h2>
                    <p className="dark:text-dark-fifth text-fifth text-center tracking-wide text-md">
                        Sin conexion a Internet. Comprueba la conexion.
                    </p>
                </div>
                <ComponentLink url={`${process.env.DEVELOPMENT_DOMAIN}/dashboard/main`} title="Reintentar" description_class="border-[0.1px] dark:border-dark-secondary border-secondary px-2 py-1 b rounded-md dark:hover:bg-dark-secondary hover:bg-secondary dark:hover:text-dark-primary hover:text-primary dark:bg-dark-primary bg-primary dark:text-dark-secondary text-secondary text-center text-md tracking-wide">
                    Reintentar
                </ComponentLink>
            </article>
        </article>
    )
}