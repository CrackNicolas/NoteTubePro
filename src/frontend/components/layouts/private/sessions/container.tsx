import Image from "next/image";

import { Props_session } from "@/context/types/session"

import ComponentLoading from "@/frontend/components/layouts/private/sessions/loading";

type Props = {
    sessions: Props_session[],
    load_notes: (session: Props_session) => Promise<void>
}

export default function ComponentList(props: Props): JSX.Element {
    const { sessions, load_notes } = props;

    return (
        <article className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-4 pb-5">
            {
                (sessions.length === 0) ?
                    <ComponentLoading count={10} />
                    :
                    sessions.map((session: Props_session) => {
                        return (
                            <div key={session.id} onClick={() => load_notes(session)} title={`Sesion ${session.user?.name}`} className="relative flex items-start gap-3 w-full overflow-hidden dark:bg-dark-sixth bg-sixth rounded-md border-[0.1px] border-opacity-30 dark:border-dark-secondary border-secondary p-2.5 group hover:border-opacity-100 cursor-pointer">
                                <span className={`absolute shadow-sm ${(session.status) ? 'dark:bg-dark-secondary bg-secondary dark:shadow-dark-secondary shadow-secondary' : 'dark:bg-dark-error bg-error dark:shadow-dark-error shadow-error'} w-2 h-2 rounded-full top-2 right-2`} title={`Usuario ${session.status ? 'activo' : 'desconectado'}`} />
                                <Image src={(session.user) ? session.user?.image : 'https://cdn.icon-icons.com/icons2/1381/PNG/512/systemusers_94754.png'} alt="Imagen de usuario" width={34} height={24} className="rounded-full mt-1" />
                                <div className="flex flex-col">
                                    <h6 className="line-clamp-1 dark:text-dark-secondary text-secondary font-bold text-lg tracking-wider">
                                        {session.user?.name}
                                    </h6>
                                    <h6 className="line-clamp-1 dark:text-dark-fifth text-fifth dark:group-hover:text-dark-tertiary group-hover:text-tertiary font-normal text-[14.5px]">
                                        {session.user?.email}
                                    </h6>
                                    <h6 className="line-clamp-1 dark:text-dark-fifth text-fifth opacity-80 tracking-wide font-normal text-[12px] mt-1">
                                        {
                                            session.last_time?.replace('Creada', 'Ultima vez')
                                        }
                                    </h6>
                                    <h6 className="line-clamp-1 dark:text-dark-fifth text-fifth opacity-80 tracking-wide font-normal text-[12px] ">
                                        IP: {session.origin?.IP_adress}
                                    </h6>
                                    <h6 className="line-clamp-1 dark:text-dark-fifth text-fifth opacity-80 tracking-wide font-normal text-[12px] ">
                                        Ciudad: {session.origin?.city}
                                    </h6>
                                </div>
                            </div>
                        )
                    })
            }
        </article>
    )
}