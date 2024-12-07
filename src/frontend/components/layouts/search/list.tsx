import { Dispatch, SetStateAction } from "react";

import { Props_loading_notes } from "@/frontend/types/props";
import { Props_delete_note, Props_note } from "@/context/types/note"

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentNote from "@/frontend/components/layouts/notes/note";
import ComponentHeader from "@/frontend/components/partials/template/dashboard/header";
import ComponentLoading from "@/frontend/components/layouts/notes/list/loading";

type Props = {
    state: boolean,
    notes: Props_note[],
    loading?: Props_loading_notes,
    update_note: (note: Props_note) => void,
    notes_selected: Props_delete_note[],
    setNotes_selected: Dispatch<SetStateAction<Props_delete_note[]>>,
    description_class?: string
}

export default function ComponentList(props: Props): JSX.Element {
    const { loading, notes, update_note, description_class = '', state, notes_selected, setNotes_selected } = props;

    return (
        <article className={`${description_class} grid grid-cols-1 xl:grid-cols-2 place-items-center gap-4`}>
            {
                (loading?.value) ?
                    <ComponentLoading count={14} />
                    :
                    (notes.length === 0) ?
                        <div className="col-span-full flex flex-col items-center gap-5 pt-12">
                            <ComponentIcon name={loading?.icon} size={180} description_class={`size-[150px] sm:size-[200px] dark:text-dark-secondary text-secondary cursor-pointer`} />
                            <ComponentHeader title={loading?.description} />
                        </div>
                        :
                        notes.map((note: Props_note) => {
                            return <ComponentNote key={note._id} note={note} update_note={update_note} state={state} notes_selected={notes_selected} setNotes_selected={setNotes_selected} />
                        })
            }
        </article>
    )
}