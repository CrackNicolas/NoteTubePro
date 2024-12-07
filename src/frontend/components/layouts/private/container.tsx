'use client'

import { useEffect, useState } from "react"

import ComponentHeader from "@/frontend/components/layouts/private/header";
import ComponentListNotes from "@/frontend/components/layouts/private/notes/container";
import ComponentListSessions from "@/frontend/components/layouts/private/sessions/container";

import { Request } from "@/backend/logic/requests";
import { Props_note } from "@/context/types/note";
import { Props_session } from "@/context/types/session";

export default function ComponentSessions(): JSX.Element {
    const [sessions, setSessions] = useState<Props_session[] | []>([]);
    const [notes, setNotes] = useState<Props_note[] | []>([]);

    const [user_selected, setUser_selected] = useState<Props_session>();

    const load_notes = async (session: Props_session): Promise<void> => {
        setNotes([]);
        setUser_selected(session);

        const { data } = await Request('GET',`/api/private/notes/${session.id}`);

        if (data.status === 200) {
            setNotes(data.data);
        }
    }

    const load_sessions = async (): Promise<void> => {
        const { data } = await Request('GET','/api/private/sessions');

        if (data.status === 200) {
            setSessions(data.data);
        }
    }

    useEffect(() => {
        load_sessions();
    }, []);

    return (
        <article className="flex flex-col gap-5 mt-[40px] pt-7 h-[calc(100vh-50px)]">
            <ComponentHeader count_sessions={sessions.length} user_selected={user_selected} setUser_selected={setUser_selected} />
            {
                (user_selected) ?
                    <ComponentListNotes notes={notes} user_selected={user_selected} />
                    :
                    <ComponentListSessions sessions={sessions} load_notes={load_notes} />
            }
        </article>
    )
}