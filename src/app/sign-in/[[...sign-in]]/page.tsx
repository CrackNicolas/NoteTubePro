import { ComponentSignIn } from "@/frontend/components/services/clerk";

export default function Page() {
    return (
        <section className="grid place-items-center items-center h-screen">
            <div className="absolute flex flex-col gap-y-5 justify-center items-center py-[110px] ">
                <div className="animate-spin rounded-full h-[70px] w-[70px] border-t-[1.5px] border-b-[1.5px] dark:border-dark-secondary border-secondary" />
                <span className="dark:text-dark-secondary text-secondary tracking-wider">
                    Cargando
                </span>
            </div>
            <ComponentSignIn />
        </section>
    )
}