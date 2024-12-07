import { Dispatch, SetStateAction } from "react";

import ComponentIcon from "@/frontend/components/partials/icon";

import { Props_session } from "@/context/types/session";

type Props = {
    user_selected?: Props_session,
    count_sessions: number,
    setUser_selected: Dispatch<SetStateAction<Props_session | undefined>>
}

export default function ComponentHeader(props: Props): JSX.Element {
    const { count_sessions, user_selected, setUser_selected } = props;

    const data = user_selected ? ["", `Usuario ${user_selected.user?.name}`] : ["users-fill", `${count_sessions} Sesiones de usuario`];

    return (
        <article className="w-full flex justify-between items-center">
            <div title="Sesiones de usuario" className="flex items-center gap-x-3 cursor-default ">
                <span className="line-clamp-1 mt-[2px] text-secondary dark:text-dark-secondary text-xl tracking-wider font-semibold">
                    {data[1]}
                </span>
            </div>
            {
                user_selected && (
                    <button type="button" onClick={() => setUser_selected(undefined)} className="outline-none bg-room dark:bg-dark-room rounded-full p-2">
                        <ComponentIcon name="return" size={16} description_class="cursor-pointer dark:text-dark-secondary text-secondary" />
                    </button>
                )
            }
        </article>
    )
}