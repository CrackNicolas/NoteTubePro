import { Component } from "@/frontend/types/component";

import { PropsNote } from "@/context/types/note"
import { PropsLoadingNotes } from "@/frontend/types/props";

import IElement from "@/frontend/interfaces/elements/element";
import INoteBase from "@/frontend/interfaces/note";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentNote from "@/frontend/components/layouts/notes/note";
import ComponentHeader from "@/frontend/components/partials/template/dashboard/header";
import ComponentLoading from "@/frontend/components/layouts/notes/list/loading";


interface IList extends Pick<INoteBase, 'notes' | 'notesSelected' | 'setNotesSelected'>, Partial<Pick<IElement, 'descriptionClass'>>, Pick<IElement, 'state'> {
    loading?: PropsLoadingNotes
}

export default function ComponentList(props: IList): Component {
    const { loading, notes, descriptionClass = '', state, notesSelected, setNotesSelected } = props;

    return (
        <article className={`${descriptionClass} pt-[3px] sm:pb-10 grid grid-cols-1 xl:grid-cols-2 place-items-center gap-4`}>
            {
                (loading?.value) ?
                    <ComponentLoading count={12} />
                    :
                    (notes.length == 0) ?
                        <div className="col-span-full flex flex-col items-center gap-5 pt-12">
                            <ComponentIcon name={loading?.icon} size={180} descriptionClass={`w-[150px] h-[150px] sm:h-[200px] sm:w-[200px] dark:text-dark-secondary text-secondary cursor-pointer`} />
                            <ComponentHeader title={loading?.description} />
                        </div>
                        :
                        notes.map((note: PropsNote) => {
                            return <ComponentNote key={note._id} note={note} state={state} notesSelected={notesSelected} setNotesSelected={setNotesSelected} />
                        })
            }
        </article>
    )
}