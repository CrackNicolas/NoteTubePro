import { MouseEvent } from 'react';

import { Dispatch, SetStateAction, useState } from "react";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentView from "@/frontend/components/layouts/notes/view";

import { Time_elapsed } from "@/frontend/logic/time";
import { Props_delete_note, Props_note } from "@/context/types/note";

type Props = {
    note: Props_note,
    paint?: boolean,
    state: boolean,
    update_note: (note: Props_note) => void,
    notes_selected: Props_delete_note[],
    setNotes_selected: Dispatch<SetStateAction<Props_delete_note[]>>
}

export default function ComponentNote(props: Props): JSX.Element {
    const { note, paint = false, update_note, state, notes_selected, setNotes_selected } = props;
    const { title, description, priority, createdAt, featured } = note;

    const [view_note, setView_note] = useState<Props_note | undefined>(undefined);
    const [open_modal_view, setOpen_modal_view] = useState<boolean>(false);

    const open_view = (note: Props_note): void => {
        setView_note(note);
        setOpen_modal_view(true);
    }

    const include_note = (id?: string): boolean => notes_selected.map((note: Props_delete_note) => note._id).includes(id);

    const note_selection = (data: Props_delete_note): void => {
        if (state) {
            setNotes_selected(prev => include_note(data._id) ? prev.filter(n => n._id !== data._id) : [...prev, { _id: data._id, file: data.file }])
        }
    }

    const redirect = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        update_note(note);
    }

    return (
        <div onClick={() => state ? note_selection({ _id: (note._id) ? note._id : '', file: note.file?.id }) : open_view(note)} title="Nota" className={`relative transition-padding group grid grid-cols-9 w-full dark:bg-dark-sixth bg-sixth ${state ? 'sm:pl-12.5 pl-12 sm:pr-2.5 pr-2' : 'sm:px-2.5 px-2'} sm:py-2 py-1.5 cursor-pointer rounded-md border-[0.1px] dark:border-dark-secondary border-secondary ${paint ? 'border-opacity-100' : 'border-opacity-20 hover:border-opacity-100'}`}>
            {
                state && (
                    <div className="absolute h-full flex items-center px-2">
                        {
                            include_note(note._id) ?
                                <span title="Nota seleccionada" className='cursor-pointer border-[0.1px] dark:border-dark-error border-error dark:bg-transparent bg-primary rounded-full transition-padding p-1'>
                                    <ComponentIcon
                                        name='check'
                                        size={20}
                                        description_class="cursor-pointer dark:text-dark-error text-error m-auto mt-[1px] icon-transition icon-visible"
                                    />
                                </span>
                                :
                                <span title="Marcar nota" className='cursor-pointer border-[0.1px] dark:border-dark-secondary border-secondary rounded-sm'>
                                    <ComponentIcon
                                        name='check'
                                        size={12}
                                        description_class="cursor-pointer dark:text-dark-secondary text-secondary transition-width icon-transition icon-hidden"
                                    />
                                </span>
                        }
                    </div>
                )
            }
            <div className="col-span-8 flex flex-col">
                <span className="flex">
                    <span className="line-clamp-1 mr-1 text-md font-normal group-hover:font-semibold tracking-wide dark:text-dark-secondary text-secondary">
                        {title}
                    </span>
                    {(priority === "Alta") && <ComponentIcon name="arrow" size={15} description_class="sm:relative absolute sm:right-auto sm:mt-[3px] right-[22px] cursor-pointer text-red-500 rotate-[-180deg] " />}
                    {(priority === "Media") && <ComponentIcon name="arrow" size={15} description_class="sm:relative absolute sm:right-auto sm:mt-[3px] right-[22px] cursor-pointer text-yellow-500 rotate-[-180deg] " />}
                    {(priority === "Baja") && <ComponentIcon name="arrow" size={15} description_class="sm:relative absolute sm:right-auto sm:mt-[3px] right-[22px] cursor-pointer text-green-500 " />}
                    {(featured) && <ComponentIcon name="star-fill" size={15} description_class="sm:relative absolute sm:right-auto sm:mt-[3px] right-[5px] cursor-pointer dark:text-dark-fifth text-fifth " />}
                    {(!featured) && <ComponentIcon name="star-half" size={15} description_class="sm:relative absolute sm:right-auto sm:mt-[3px] right-[5px] cursor-pointer dark:text-dark-fifth text-fifth " />}
                </span>
                <p className="line-clamp-1 text-sm dark:text-dark-tertiary dark:opacity-90 text-tertiary opacity-50">
                    {description}
                </p>
                <h6 title="Tiempo transcurrido" className="sm:visible invisible absolute right-3 dark:text-dark-tertiary dark:opacity-90 text-tertiary text-[11px] opacity-50">
                    {Time_elapsed(createdAt)}
                </h6>
            </div>
            <div className="col-span-1 flex flex-col items-end justify-end">
                {
                    !state && (
                        <button onClick={(event) => redirect(event)} type="button" title="Editar" className="outline-none border-none">
                            <ComponentIcon name="update" size={18} description_class="dark:text-dark-fifth text-fifth dark:hover:text-dark-secondary hover:text-secondary cursor-pointer" />
                        </button>
                    )
                }
            </div>
            {
                (view_note) && <ComponentView open={open_modal_view} setOpen={setOpen_modal_view} note={view_note} />
            }
        </div >
    )
}