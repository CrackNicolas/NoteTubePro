"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Component } from "@/frontend/types/component";

import useMouseDown from "@/frontend/hooks/mousedown";

import { PropsResponse } from "@/shared/types/response";
import { PropsCategory } from "@/context/types/category";
import { PropsDeleteNote, PropsNote } from "@/context/types/note";
import { PropsLoadingNotes, PropsParamsSearch } from "@/frontend/types/props";

import IContext from "@/context/interfaces/context";
import useAppContext from "@/context/hooks/context";
import useAppTranslation from "@/shared/hooks/translation";

import { httpRequest } from "@/shared/logic/requests";

import { ValueDate } from "@/shared/enums/note/date";
import { ValueBoolean } from "@/frontend/enums/boolean";
import { ValuePriority } from "@/shared/enums/note/priority";
import { StatusSearchNote } from "@/frontend/enums/note/search/search";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentList from "@/frontend/components/layouts/search/list";
import ComponentMessageWait from "@/frontend/components/layouts/messages/wait";
import ComponentInputSearch from "@/frontend/components/layouts/search/input_search";
import ComponentSelectStatic from "@/frontend/components/partials/form/select_static";
import ComponentButtonCreate from "@/frontend/components/layouts/search/button_create";
import ComponentSelectDynamic from "@/frontend/components/partials/form/select_dynamic";
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";
import ComponentMessageConfirmationDelete from "@/frontend/components/layouts/messages/confirmation_delete";

export default function ComponentSearch(): Component {
    const { opacity }: IContext = useAppContext();

    const { register, watch, setValue } = useForm();

    const { translate } = useAppTranslation();

    const title = watch('title');

    const refNavToggle = useRef<HTMLDivElement>(null);
    const refButtonViewToggle = useRef<HTMLButtonElement>(null);
    const refButtonCloseToggle = useRef<HTMLButtonElement>(null);
    const refButtonDeleteNote = useRef<HTMLButtonElement>(null);
    const refButtonCreateNote = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string | StatusSearchNote>(StatusSearchNote.RELOAD);
    const [response, setResponse] = useState<PropsResponse>();
    const [listNotes, setListNotes] = useState<PropsNote[]>([]);
    const [selectDate, setSelectDate] = useState<string | undefined>(translate('search.toggle.selects.date.default'));
    const [viewFilter, setViewFilter] = useState<boolean>(false);
    const [stateSelect, setStateSelect] = useState<boolean>(false);
    const [loadingNotes, setLoadingNotes] = useState<PropsLoadingNotes>();
    const [notesSelected, setNotesSelected] = useState<PropsDeleteNote[]>([]);
    const [loadingMessage, setLoadingMessage] = useState<boolean>(false);
    const [selectCategory, setSelectCategory] = useState<PropsCategory>({ title: translate('search.toggle.selects.category') });
    const [selectPriority, setSelectPriority] = useState<string | undefined>(translate('search.toggle.selects.priority'));
    const [selectFeatured, setSelectFeatured] = useState<string | undefined>(translate('search.toggle.selects.highlight'));
    const [openConfirmationDelete, setOpenConfirmationDelete] = useState<boolean>(false);

    const handleClickOutside = (event: MouseEvent): void => {
        if (refNavToggle.current &&
            !refNavToggle.current.contains(event.target as Node) &&
            !refButtonCloseToggle.current?.contains(event.target as Node) &&
            !refButtonViewToggle.current?.contains(event.target as Node) &&
            !refButtonDeleteNote.current?.contains(event.target as Node) &&
            !refButtonCreateNote.current?.contains(event.target as Node)
        ) {
            controllerViewFilter(false);
        }
    }

    useMouseDown({ action: handleClickOutside });

    const restart = (): void => {
        setSelectCategory({ title: translate('search.toggle.selects.category') });
        setSelectPriority(translate('search.toggle.selects.priority'));
        setSelectFeatured(translate('search.toggle.selects.highlight'));
        setSelectDate(translate('search.toggle.selects.date.default'));
        setValue('title', undefined);
    }

    const closeDelete = (): void => {
        setStateSelect(false);
        restart();
    }

    const selectNote = (value: boolean): void => {
        setStateSelect(value);
        setNotesSelected([]);
    }

    const noteAll: boolean = (notesSelected.length === listNotes.length);

    const selectAll = (): void => {
        if (noteAll) {
            setNotesSelected([]);
            return;
        }
        listNotes.map((note: PropsNote) => {
            if (!notesSelected.map((note: PropsDeleteNote) => note._id).includes(note._id)) {
                setNotesSelected(prev => [...prev, { _id: note._id, file: note.file?.id }])
            }
        })
    }

    const loadNotes = useCallback(async (): Promise<void> => {
        if (search === StatusSearchNote.NOT_FILTER) return;

        setLoadingNotes({ value: true, button: true });
        const { data } = await httpRequest({ type: 'GET', url: `/api/notes${(search !== '{}') ? `/${search}` : ''}` });
        if (data.status === 200) {
            setLoadingNotes({
                value: false,
                icon: `emoji-${search === '{}' ? 'without' : 'search'}-notes`,
                description: (search === '{}') ? translate('search.messages.text_1') : translate('search.messages.text_2'),
                button: (search === '{}')
            });
            setListNotes(data.details);
        }
        if (data.status === 500) {
            setOpen(true);
            setResponse(data);
            setListNotes([]);
            setLoadingNotes({ value: false });
        }
    }, [search]);

    const listenToChanges = useCallback(async (): Promise<void> => {
        const criteria: PropsParamsSearch = {
            title: (title !== '') ? title : undefined,
            category: (selectCategory.title !== translate('search.toggle.selects.category')) ? selectCategory : undefined,
            priority: (selectPriority !== translate('search.toggle.selects.priority')) ? selectPriority : undefined,
            dates: (selectDate !== translate('search.toggle.selects.date.default')) ? selectDate : undefined,
            featured: (selectFeatured !== translate('search.toggle.selects.highlight')) ? (selectFeatured === 'SI') : undefined,
        }
        console.log(criteria)
        setSearch(JSON.stringify(criteria));
    }, [title, selectCategory, selectPriority, selectDate, selectFeatured])

    const deleteNotes = async (): Promise<void> => {
        setLoadingMessage(true);
        const { data } = await httpRequest({ type: 'DELETE', url: `/api/notes/${JSON.stringify(notesSelected)}` });
        if (data.status === 200) {
            setOpen(true);
            setResponse(data);
            loadNotes();
            setStateSelect(false);
            setLoadingMessage(false);
            setNotesSelected([]);
            restart();
        }
    }

    const controllerViewFilter = (value: boolean): void => {
        setViewFilter(value);
        if (value) {
            window.document.body.classList.add('overflow-hidden');
        } else {
            window.document.body.classList.remove('overflow-hidden');
        }
    }

    useEffect(() => {
        restart();
    }, [translate('search.toggle.selects.priority')]);

    useEffect(() => {
        loadNotes();
    }, [search, loadNotes]);

    useEffect(() => {
        listenToChanges();
    }, [title, selectCategory, selectPriority, selectFeatured, selectDate, listenToChanges]);

    return (
        <article className={`${opacity && 'opacity-50'} relative min-h-screen 2xl:px-0 sm:pl-5 flex flex-col gap-5 mt-[30px] pt-6`}>
            <article className="fixed max-w-7xl w-full mt-[3px] z-40">
                <article className={`${viewFilter && 'sz:w-[calc(100%-80px)] md:w-[calc(100%-275px)]'} 2xl:w-[calc(100%-80px)] sm:w-[calc(100%-100px)] w-[calc(100%-25px)] pb-3 z-50 flex gap-y-6 gap-x-3 justify-between items-center dark:bg-dark-primary bg-primary transition-width`}>
                    {
                        stateSelect ?
                            <div className="flex gap-x-3">
                                <span title={noteAll ? translate('search.nav.buttons.mark.text_2') : translate('search.nav.buttons.mark.text_1')} onClick={() => selectAll()} className={`my-auto border-[0.1px] cursor-pointer ${noteAll ? ' dark:border-dark-error border-error dark:bg-dark-primary bg-primary rounded-full px-[0.5px] ' : 'dark:border-dark-secondary border-secondary rounded-sm'}`}>
                                    <ComponentIcon name='check' size={12} descriptionClass={`cursor-pointer ${noteAll ? 'dark:text-dark-error text-error m-auto mt-[1px] icon-transition icon-visible' : 'dark:text-dark-secondary text-secondary transition-width icon-transition icon-hidden'} `} />
                                </span>
                                <div className="flex gap-x-1.5">
                                    {
                                        (notesSelected.length !== 0) && (
                                            <button type="button" title={translate('search.nav.buttons.delete.text_1')} onClick={() => setOpenConfirmationDelete(true)} className="group cursor-pointer dark:hover:bg-dark-error hover:bg-error border-[0.1px] dark:border-dark-error border-error outline-none rounded-md px-2.5 py-[0.6px] " >
                                                <span className="dark:group-hover:text-dark-primary group-hover:text-primary dark:text-dark-error text-error text-sm group-hover:font-semibold font-normal tracking-wider transition duration-500">
                                                    {translate('search.nav.buttons.delete.text_1')}
                                                </span>
                                            </button>
                                        )
                                    }
                                    <button type="button" title={translate('search.nav.buttons.close.text_2')} onClick={() => closeDelete()} className="group cursor-pointer dark:hover:bg-dark-error hover:bg-error border-[0.1px] dark:border-dark-error border-error outline-none rounded-md px-2.5 py-[0.6px] " >
                                        <span className="dark:group-hover:text-dark-primary group-hover:text-primary dark:text-dark-error text-error text-sm group-hover:font-semibold font-normal tracking-wider transition duration-500">
                                            {translate('search.nav.buttons.close.text_1')}
                                        </span>
                                    </button>
                                </div>
                            </div>
                            :
                            <ComponentInputSearch value={watch('title')} setValue={setValue} />
                    }
                    <div className="flex items-center gap-2 h-full">
                        <div ref={refButtonCreateNote}>
                            <ComponentButtonCreate />
                        </div>
                        {
                            !stateSelect && (
                                <button ref={refButtonDeleteNote} type="button" title={translate('search.nav.buttons.delete.text_2')} onClick={() => selectNote(true)} className={`outline-none ${listNotes.length === 0 && 'hidden'}`} >
                                    <ComponentIcon name="delete" descriptionClass="cursor-pointer dark:hover:text-dark-error hover:text-error dark:text-dark-fifth text-fifth" size={20} viewBox="0 0 16 16" />
                                </button>
                            )
                        }
                        {
                            !viewFilter && (
                                <button ref={refButtonViewToggle} onClick={() => controllerViewFilter(!viewFilter)} type="button" title={translate('search.toggle.title')} className="outline-none">
                                    <ComponentIcon name="filter" descriptionClass="cursor-pointer dark:hover:text-dark-secondary hover:text-secondary dark:text-dark-fifth text-fifth" size={24} viewBox="0 0 16 16" />
                                </button>
                            )
                        }
                    </div>
                </article>
            </article>
            <article className="flex pb-16 sm:pb-10 pt-12">
                <ComponentList
                    state={stateSelect}
                    notes={listNotes}
                    loading={loadingNotes}
                    notesSelected={notesSelected}
                    setNotesSelected={setNotesSelected}
                    descriptionClass={`transition-width ${viewFilter ? 'w-full sz:w-full md:w-[calc(100%-175px)]' : 'w-full'}`}
                />
                <div ref={refNavToggle} className={`fixed min-h-screen top-0 flex flex-col justify-between toggle-search ${viewFilter ? 'translate-x-0' : 'translate-x-[120%]'} right-0 dark:bg-dark-primary bg-primary z-50 w-[200px] border-fifth border-opacity-50 border-l-[0.1px] p-2`}>
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center pb-1 border-b-[3px] rounded-md border-opacity-50 dark:border-seventh border-secondary w-full">
                            <h4 className="text-gradient tracking-wider font-semibold">
                                {translate('search.toggle.title')}
                            </h4>
                            <button ref={refButtonCloseToggle} type="button" title={translate('search.toggle.buttons.close')} onClick={() => controllerViewFilter(!viewFilter)} className="outline-none">
                                <ComponentIcon name="close" descriptionClass="cursor-pointer text-secondary text-opacity-60 dark:text-seventh" size={27} viewBox="0 0 16 16" />
                            </button>
                        </div>
                        <button onClick={() => restart()} title={translate('search.toggle.buttons.clean')} className="w-full mt-2 group dark:border-dark-fifth border-fifth border-opacity-50 dark:hover:border-dark-secondary hover:border-secondary border-[0.1px] px-3 rounded-md flex items-center justify-center py-[3px] gap-x-1 outline-none transition duration-500">
                            <ComponentIcon name="load" size={16} descriptionClass="dark:group-hover:text-dark-secondary group-hover:text-secondary group-hover:opacity-100 dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-70 cursor-pointer" />
                            <span className="dark:group-hover:text-dark-secondary group-hover:text-secondary group-hover:opacity-100 text-sm tracking-wider dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-70 duration-500">
                                {translate('search.toggle.buttons.clean')}
                            </span>
                        </button>
                        <div className="relative flex flex-col gap-y-3 py-3 w-full">
                            {stateSelect && <ComponentInputSearch value={watch('title')} setValue={setValue} design={stateSelect} />}
                            <ComponentSelectStatic
                                ruteTranslate="search.toggle.selects.date"
                                title={translate('search.toggle.selects.date.default')}
                                select={selectDate}
                                setSelect={setSelectDate}
                                items={[
                                    { value: ValueDate.TODAY, icon: { name: 'date', class: 'dark:text-dark-fifth text-fifth' } },
                                    { value: ValueDate.YESTERDAY, icon: { name: 'date', class: 'dark:text-dark-fifth text-fifth' } },
                                    { value: ValueDate.AGO_7_DAYS, icon: { name: 'date', class: 'dark:text-dark-fifth text-fifth' } },
                                    { value: ValueDate.AGO_1_MONTH, icon: { name: 'date', class: 'dark:text-dark-fifth text-fifth' } }
                                ]}
                                style={{ text: 'dark:text-dark-fifth text-fifth', border: 'dark:border-dark-fifth border-fifth', bg: 'dark:bg-dark-secondary bg-secondary' }}
                            />
                            <ComponentSelectStatic
                                ruteTranslate="notes.form.items.priority"
                                title={translate('search.toggle.selects.priority')}
                                select={selectPriority}
                                setSelect={setSelectPriority}
                                items={[
                                    { value: ValuePriority.High, icon: { name: 'arrow', class: 'dark:text-dark-fifth text-red-500 rotate-[-180deg]' } },
                                    { value: ValuePriority.Medium, icon: { name: 'arrow', class: 'dark:text-dark-fifth text-yellow-500 rotate-[-180deg]' } },
                                    { value: ValuePriority.Low, icon: { name: 'arrow', class: 'dark:text-dark-fifth text-green-500' } }
                                ]}
                                style={{ text: 'dark:text-dark-fifth text-fifth', border: 'dark:border-dark-fifth border-fifth', bg: 'dark:bg-dark-secondary bg-secondary' }}
                            />
                            <ComponentSelectStatic
                                ruteTranslate="notes.form.items.featured"
                                title={translate('search.toggle.selects.highlight')}
                                select={selectFeatured}
                                setSelect={setSelectFeatured}
                                items={[
                                    { value: ValueBoolean.YEAH, icon: { name: 'star-fill', class: 'dark:text-dark-fifth text-fifth' } },
                                    { value: ValueBoolean.NOT, icon: { name: 'star-half', class: 'dark:text-dark-fifth text-fifth' } }
                                ]}
                                style={{ text: 'dark:text-dark-fifth text-fifth', border: 'dark:border-dark-fifth border-fifth', bg: 'dark:bg-dark-secondary bg-secondary' }}
                            />
                            <ComponentSelectDynamic
                                selectCategory={selectCategory}
                                setSelectCategory={setSelectCategory}
                                register={register}
                                style={{ text: 'dark:text-dark-fifth text-fifth', border: 'dark:border-dark-fifth border-fifth' }}
                            />
                        </div>
                    </div>
                </div>
            </article>
            {loadingMessage && <ComponentMessageWait open={loadingMessage} setOpen={setLoadingMessage} />}
            {response && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />}
            <ComponentMessageConfirmationDelete open={openConfirmationDelete} setOpen={setOpenConfirmationDelete} action={deleteNotes} />
        </article>
    )
}