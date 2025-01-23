import { Component } from "@/frontend/types/component";

import { PropsSession } from "@/context/types/session";
import { PropsDispatchSession } from "@/frontend/types/dispatch";

import ComponentIcon from "@/frontend/components/partials/icon";

interface IHeader {
    userSelected?: PropsSession,
    countSessions: number,
    setUserSelected: PropsDispatchSession
}

export default function ComponentHeader(props: IHeader): Component {
    const { countSessions, userSelected, setUserSelected } = props;

    const data: string[] = userSelected ? ["", `Usuario ${userSelected.user?.name}`] : ["users-fill", `Tienes ${countSessions} ${(countSessions == 1) ? 'sesion' : 'sesiones'} de usuario`];

    return (
        <article className="w-full flex justify-between items-center">
            <div title="Sesiones de usuario" className="flex items-center gap-x-3 cursor-default ">
                <span className="line-clamp-1 mt-[2px] text-secondary dark:text-dark-secondary text-xl tracking-wider font-semibold">
                    {data[1]}
                </span>
            </div>
            {
                userSelected && (
                    <button type="button" onClick={() => setUserSelected(undefined)} className="outline-none bg-room dark:bg-dark-room rounded-full p-2">
                        <ComponentIcon name="return" size={16} descriptionClass="cursor-pointer dark:text-dark-secondary text-secondary" />
                    </button>
                )
            }
        </article>
    )
}