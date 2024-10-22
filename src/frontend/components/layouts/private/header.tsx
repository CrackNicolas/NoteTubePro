import { Dispatch, SetStateAction } from "react";

import ComponentIcon from "@/frontend/components/partials/icon";

import { Props_session } from "@/context/types/session";

type Props = {
    count_sessions: number,
    user_selected?: Props_session,
    setUser_selected: Dispatch<SetStateAction<Props_session | undefined>>
}

export default function ComponentHeader(props: Props) {
    const { count_sessions, user_selected, setUser_selected } = props;

    const data = user_selected ? ["", `Usuario ${user_selected.user?.name}`] : ["users-fill", `${count_sessions} Sesiones de usuario`];

    return (
        <article className="w-full flex justify-between items-center">
            <button type="button" title="Sesiones de usuario" className="flex items-center gap-x-3 outline-none cursor-default ">
                <span className="line-clamp-1 mt-[2px] text-secondary dark:text-dark-secondary text-xl tracking-wider font-semibold">
                    {data[1]}
                </span>
            </button>
            {
                user_selected && (
                    <span onClick={() => setUser_selected(undefined)} className="bg-room dark:bg-dark-room rounded-full p-2">
                        <ComponentIcon name="return" size={16} description_class="cursor-pointer dark:text-dark-secondary text-secondary" />
                    </span>
                )
            }
        </article>
    )
}