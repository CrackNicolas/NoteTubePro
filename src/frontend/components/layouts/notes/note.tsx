import { useRouter } from "next/navigation";
import { MouseEvent, useState } from 'react';

import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import IElement from '@/frontend/interfaces/elements/element';
import IContext from '@/context/interfaces/context';
import INoteBase from '@/frontend/interfaces/note';

import useAppContext from '@/context/hooks/context';

import { Component } from '@/frontend/types/component';
import { timeElapsed } from "@/frontend/logic/time";
import { PropsDeleteNote, PropsNote } from "@/context/types/note";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentView from "@/frontend/components/layouts/notes/view";

interface INote extends Pick<INoteBase, 'note' | 'notesSelected' | 'setNotesSelected'>, Partial<Pick<IElement, 'paint'>>, Pick<IElement, 'state'> { }

export default function ComponentNote(props: INote): Component {
    const { note, paint = false, state, notesSelected, setNotesSelected } = props;
    const { title, description, priority, createdAt, featured } = note;

    const { setNote }: IContext = useAppContext();

    const router = useRouter();

    const [viewNote, setViewNote] = useState<PropsNote | undefined>(undefined);
    const [openModalView, setOpenModalView] = useState<boolean>(false);

    const openView = (note: PropsNote): void => {
        setViewNote(note);
        setOpenModalView(true);
    }

    const includeNote = (id?: string): boolean => notesSelected.map((note: PropsDeleteNote) => note._id).includes(id);

    const noteSelection = (data: PropsDeleteNote): void => {
        if (state) {
            setNotesSelected(prev => includeNote(data._id) ? prev.filter(n => n._id !== data._id) : [...prev, { _id: data._id, file: data.file }])
        }
    }

    const redirect = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        setNote(note);
        router.push(APP_ROUTES.notes.init);
    }

    return (
        <div onClick={() => state ? noteSelection({ _id: (note._id) ? note._id : '', file: note.file?.id }) : openView(note)} title="Nota" className={`relative transition-padding group grid grid-cols-9 w-full dark:bg-dark-sixth bg-sixth ${state ? 'sm:pl-12.5 pl-12 sm:pr-2.5 pr-2' : 'sm:px-2.5 px-2'} sm:py-2 py-1.5 cursor-pointer rounded-md border-[0.1px] dark:border-dark-secondary border-secondary ${paint ? 'border-opacity-100' : 'border-opacity-20 hover:border-opacity-100'}`}>
            {
                state && (
                    <div className="absolute h-full flex items-center px-2">
                        {
                            includeNote(note._id) ?
                                <span title="Nota seleccionada" className='cursor-pointer border-[0.1px] dark:border-dark-error border-error dark:bg-transparent bg-primary rounded-full transition-padding p-1'>
                                    <ComponentIcon
                                        name='check'
                                        size={20}
                                        descriptionClass="cursor-pointer dark:text-dark-error text-error m-auto mt-[1px] icon-transition icon-visible"
                                    />
                                </span>
                                :
                                <span title="Marcar nota" className='cursor-pointer border-[0.1px] dark:border-dark-secondary border-secondary rounded-sm'>
                                    <ComponentIcon
                                        name='check'
                                        size={12}
                                        descriptionClass="cursor-pointer dark:text-dark-secondary text-secondary transition-width icon-transition icon-hidden"
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
                    {(priority === "Alta") && <ComponentIcon name="arrow" size={15} descriptionClass="sm:relative absolute sm:right-auto sm:mt-[3px] right-[22px] cursor-pointer text-red-500 rotate-[-180deg] " />}
                    {(priority === "Media") && <ComponentIcon name="arrow" size={15} descriptionClass="sm:relative absolute sm:right-auto sm:mt-[3px] right-[22px] cursor-pointer text-yellow-500 rotate-[-180deg] " />}
                    {(priority === "Baja") && <ComponentIcon name="arrow" size={15} descriptionClass="sm:relative absolute sm:right-auto sm:mt-[3px] right-[22px] cursor-pointer text-green-500 " />}
                    {(featured) && <ComponentIcon name="star-fill" size={15} descriptionClass="sm:relative absolute sm:right-auto sm:mt-[3px] right-[5px] cursor-pointer dark:text-dark-fifth text-fifth " />}
                    {(!featured) && <ComponentIcon name="star-half" size={15} descriptionClass="sm:relative absolute sm:right-auto sm:mt-[3px] right-[5px] cursor-pointer dark:text-dark-fifth text-fifth " />}
                </span>
                <p className="line-clamp-1 text-sm dark:text-dark-tertiary dark:opacity-90 text-tertiary opacity-50">
                    {description}
                </p>
                <h6 title="Tiempo transcurrido" className="sm:visible invisible absolute right-3 dark:text-dark-tertiary dark:opacity-90 text-tertiary text-[11px] opacity-50">
                    {timeElapsed(createdAt)}
                </h6>
            </div>
            <div className="col-span-1 flex flex-col items-end justify-end">
                {
                    !state && (
                        <button onClick={(event) => redirect(event)} type="button" title="Editar" className="outline-none border-none">
                            <ComponentIcon name="update" size={18} descriptionClass="dark:text-dark-fifth text-fifth dark:hover:text-dark-secondary hover:text-secondary cursor-pointer" />
                        </button>
                    )
                }
            </div>
            {
                (viewNote) && <ComponentView open={openModalView} setOpen={setOpenModalView} note={viewNote} />
            }
        </div >
    )
}