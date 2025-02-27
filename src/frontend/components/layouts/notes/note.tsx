import { useRouter } from "next/navigation";
import { MouseEvent, useState } from 'react';

import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import IElement from '@/frontend/interfaces/elements/element';
import IContext from '@/context/interfaces/context';
import INoteBase from '@/frontend/interfaces/note';

import useAppContext from '@/context/hooks/context';
import useAppTranslation from "@/shared/hooks/translation";
import translateLastTime from "@/frontend/logic/translate/format_time";

import { Component } from '@/frontend/types/component';
import { timeElapsed } from "@/frontend/logic/time";
import { ValueBoolean } from "@/frontend/enums/boolean";
import { PropsDeleteNote, PropsNote } from "@/context/types/note";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentView from "@/frontend/components/layouts/notes/view";

interface INote extends Pick<INoteBase, 'note' | 'notesSelected' | 'setNotesSelected'>, Partial<Pick<IElement, 'paint'>>, Pick<IElement, 'state'> { }

export default function ComponentNote(props: INote): Component {
    const { note, paint = false, state, notesSelected, setNotesSelected } = props;
    const { title, description, createdAt, featured } = note;

    const { setNote }: IContext = useAppContext();

    const { translate } = useAppTranslation();

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
            setNotesSelected(prev => includeNote(data._id) ? prev.filter(note => note._id !== data._id) : [...prev, { _id: data._id, file: data.file }])
        }
    }

    const redirect = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        setNote(note);
        localStorage.setItem('last_page', ValueBoolean.YEAH);
        router.push(APP_ROUTES.notes.init);
    }

    return (
        <div onClick={() => state ? noteSelection({ _id: (note._id) ?? '', file: note.file?.id }) : openView(note)} title={translate('notes.form.note.default')} className={`relative transition-padding group grid grid-cols-9 w-full dark:bg-dark-sixth bg-sixth ${state ? 'sm:pl-12.5 pl-12 sm:pr-2.5 pr-2' : 'sm:px-2.5 px-2'} sm:py-2 py-1.5 cursor-pointer rounded-md border-[0.1px] dark:border-dark-secondary border-secondary ${paint ? 'border-opacity-100' : 'border-opacity-20 hover:border-opacity-100'}`}>
            {
                state && (
                    <div className="absolute h-full flex items-center px-2">
                        {
                            includeNote(note._id) ?
                                <span title={translate('notes.form.note.selected')} className='cursor-pointer border-[0.1px] dark:border-dark-error border-error dark:bg-transparent bg-primary rounded-full transition-padding p-1'>
                                    <ComponentIcon
                                        name='check'
                                        size={20}
                                        descriptionClass="cursor-pointer dark:text-dark-error text-error m-auto mt-[1px] icon-transition icon-visible"
                                    />
                                </span>
                                :
                                <span title={translate('notes.form.note.unselected')} className='cursor-pointer border-[0.1px] dark:border-dark-secondary border-secondary rounded-sm'>
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
                    {(featured) && <ComponentIcon name="star-fill" size={15} descriptionClass="mt-[4px] cursor-pointer dark:text-seventh text-secondary " />}
                    {(!featured) && <ComponentIcon name="star-half" size={15} descriptionClass="mt-[4px] cursor-pointer dark:text-seventh text-secondary " />}
                    <span className="line-clamp-1 ml-1.5 sm:w-[calc(100%-150px)] text-gradient text-md font-normal group-hover:font-semibold tracking-wide dark:text-dark-secondary text-secondary">
                        {title}
                    </span>
                </span>
                <p className="line-clamp-1 text-sm dark:text-dark-tertiary dark:opacity-100 text-tertiary opacity-50">
                    {description}
                </p>
                <h6 title={translate('notes.form.note.time_elapsed')} className="sm:visible invisible absolute right-3 dark:text-dark-tertiary dark:opacity-100 text-tertiary text-[11px] opacity-50">
                    {translateLastTime({ lastTime: timeElapsed(createdAt), translate })}
                </h6>
            </div>
            <div className="col-span-1 flex flex-col items-end justify-end">
                {
                    !state && (
                        <button onClick={(event) => redirect(event)} type="button" title={translate('notes.form.note.button')} className="outline-none border-none">
                            <ComponentIcon name="update" size={18} descriptionClass="dark:text-dark-fifth text-fifth dark:text-seventh hover:text-secondary cursor-pointer" />
                        </button>
                    )
                }
            </div>
            {viewNote && <ComponentView open={openModalView} setOpen={setOpenModalView} note={viewNote} />}
        </div >
    )
}