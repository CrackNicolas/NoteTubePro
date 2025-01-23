import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Component } from "@/frontend/types/component";

import useMouseDown from "@/frontend/hooks/mousedown";

import { PropsResponse } from "@/context/types/response";
import { PropsCategory } from "@/context/types/category";
import { PropsDeleteNote, PropsNote } from "@/context/types/note";
import { PropsLoadingNotes, PropsParamsSearch } from "@/frontend/types/props";

import { httpRequest } from "@/backend/logic/requests";

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
    const { register, watch, setValue } = useForm();

    const title = watch('title');

    const refNavToggle = useRef<HTMLDivElement>(null);
    const refButtonViewToggle = useRef<HTMLButtonElement>(null);
    const refButtonCloseToggle = useRef<HTMLButtonElement>(null);
    const refButtonDeleteNote = useRef<HTMLButtonElement>(null);
    const refButtonCreateNote = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [response, setResponse] = useState<PropsResponse>();
    const [listNotes, setListNotes] = useState<PropsNote[]>([]);
    const [selectDate, setSelectDate] = useState<string | undefined>('Fecha...');
    const [viewFilter, setViewFilter] = useState<boolean>(false);
    const [stateSelect, setStateSelect] = useState<boolean>(false);
    const [loadingNotes, setLoadingNotes] = useState<PropsLoadingNotes>();
    const [notesSelected, setNotesSelected] = useState<PropsDeleteNote[]>([]);
    const [loadingMessage, setLoadingMessage] = useState<boolean>(false);
    const [selectCategory, setSelectCategory] = useState<PropsCategory>({ title: 'Categoria...' });
    const [selectPriority, setSelectPriority] = useState<string | undefined>('Prioridad...');
    const [selectFeatured, setSelectFeatured] = useState<string | undefined>('Nota destacada...');
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
    };

    useMouseDown({ action: handleClickOutside });

    const restart = (): void => {
        setSelectCategory({ title: 'Categoria...' });
        setSelectPriority('Prioridad...');
        setSelectFeatured('Nota destacada...');
        setSelectDate('Fecha...');
    }

    const closeDelete = (): void => {
        setStateSelect(false);
        setSearch('');
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
        if (search == "") return;

        setLoadingNotes({ value: true, button: true });
        const { data } = await httpRequest({ type: 'GET', url: `/api/notes${(search !== '{}') ? `/${search}` : ''}` });
        if (data.status === 200) {
            setLoadingNotes({
                value: false,
                icon: `emoji-${search === '{}' ? 'without' : 'search'}-notes`,
                description: (search === '{}') ? '¡Ups! aun no tienes tu primer nota' : 'No se encontraron resultados',
                button: (search === '{}')
            });
            setListNotes(data.data);
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
            category: (selectCategory.title !== 'Categoria...') ? selectCategory : undefined,
            priority: (selectPriority !== 'Prioridad...') ? selectPriority : undefined,
            dates: (selectDate !== 'Fecha...') ? selectDate : undefined,
            featured: (selectFeatured !== 'Nota destacada...') ? (selectFeatured === 'SI') : undefined,
        }

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
        loadNotes();
    }, [search, loadNotes]);

    useEffect(() => {
        listenToChanges();
    }, [title, selectCategory, selectPriority, selectFeatured, selectDate, listenToChanges]);

    return (
        <article className={`relative h-[calc(100vh-30px)] 2xl:pl-0 xl:pl-1 sm:pl-3 flex flex-col gap-5 mt-[30px] pt-6`}>
            <article className={`fixed pb-3 max-w-7xl pr-[29px] sm:pr-[93px] z-50 flex gap-y-6 gap-x-3 justify-between items-center dark:bg-dark-primary bg-primary transition-width ${viewFilter ? 'w-full sz:w-full md:w-[calc(100%-175px)]' : 'w-full'}`}>
                {
                    stateSelect ?
                        <div className="flex gap-x-3">
                            <span title={noteAll ? "Desmarcar todo" : "Marcar todo"} onClick={() => selectAll()} className={`my-auto border-[0.1px] cursor-pointer ${noteAll ? ' dark:border-dark-error border-error dark:bg-dark-primary bg-primary rounded-full px-[0.5px] ' : 'dark:border-dark-secondary border-secondary rounded-sm'}`}>
                                <ComponentIcon
                                    name='check'
                                    size={12}
                                    descriptionClass={`cursor-pointer ${noteAll ? 'dark:text-dark-error text-error m-auto mt-[1px] icon-transition icon-visible' : 'dark:text-dark-secondary text-secondary transition-width icon-transition icon-hidden'} `}
                                />
                            </span>
                            <div className="flex gap-x-1.5">
                                {
                                    (notesSelected.length !== 0) && (
                                        <button type="button" title="Eliminar" onClick={() => setOpenConfirmationDelete(true)} className="group cursor-pointer dark:hover:bg-dark-error hover:bg-error border-[0.1px] dark:border-dark-error border-error outline-none rounded-md px-2.5 py-[0.6px] " >
                                            <span className="dark:group-hover:text-dark-primary group-hover:text-primary dark:text-dark-error text-error text-sm group-hover:font-semibold font-normal tracking-wider transition duration-500">
                                                Eliminar
                                            </span>
                                        </button>
                                    )
                                }
                                <button type="button" title="Cancelar eliminacion" onClick={() => closeDelete()} className="group cursor-pointer dark:hover:bg-dark-error hover:bg-error border-[0.1px] dark:border-dark-error border-error outline-none rounded-md px-2.5 py-[0.6px] " >
                                    <span className="dark:group-hover:text-dark-primary group-hover:text-primary dark:text-dark-error text-error text-sm group-hover:font-semibold font-normal tracking-wider transition duration-500">
                                        Cancelar
                                    </span>
                                </button>
                            </div>
                        </div>
                        :
                        <ComponentInputSearch setValue={setValue} />
                }
                <div className="flex items-center gap-2 h-full">
                    <div ref={refButtonCreateNote}>
                        <ComponentButtonCreate />
                    </div>
                    {
                        !stateSelect && (
                            <button ref={refButtonDeleteNote} type="button" title="Eliminar notas" onClick={() => selectNote(true)} className={`outline-none ${listNotes.length === 0 && 'hidden'}`} >
                                <ComponentIcon name="delete" descriptionClass="cursor-pointer dark:hover:text-dark-error hover:text-error dark:text-dark-fifth text-fifth" size={20} viewBox="0 0 16 16" />
                            </button>
                        )
                    }
                    {
                        !viewFilter && (
                            <button ref={refButtonViewToggle} onClick={() => controllerViewFilter(!viewFilter)} type="button" title="Filtros" className="outline-none">
                                <ComponentIcon name="filter" descriptionClass="cursor-pointer dark:hover:text-dark-secondary hover:text-secondary dark:text-dark-fifth text-fifth" size={24} viewBox="0 0 16 16" />
                            </button>
                        )
                    }
                </div>
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
                <div ref={refNavToggle} className={`fixed top-0 flex flex-col justify-between toggle-search ${viewFilter ? 'translate-x-0' : 'translate-x-[120%]'} right-0 dark:bg-dark-primary bg-primary z-50 w-[200px] border-fifth border-opacity-50 border-l-[0.1px] p-2 h-[100vh]`}>
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center py-1 border-b-[3px] rounded-md border-opacity-50 dark:border-dark-secondary border-secondary w-full">
                            <h4 className="dark:text-dark-tertiary text-tertiary opacity-70 tracking-wider font-semibold">
                                Filtrar notas
                            </h4>
                            <button ref={refButtonCloseToggle} type="button" title="Cerrar menu" onClick={() => controllerViewFilter(!viewFilter)} className="outline-none">
                                <ComponentIcon name="close" descriptionClass="cursor-pointer dark:hover:text-dark-secondary hover:text-secondary hover:opacity-100 dark:text-dark-tertiary text-tertiary opacity-70" size={27} viewBox="0 0 16 16" />
                            </button>
                        </div>
                        <div className="relative flex flex-col gap-y-3 py-3 w-full">
                            {
                                stateSelect && <ComponentInputSearch setValue={setValue} design={stateSelect} />
                            }
                            <ComponentSelectStatic
                                title="Fecha"
                                select={selectDate}
                                setSelect={setSelectDate}
                                items={[
                                    { value: "Hoy", icon: { name: 'date', class: 'dark:text-dark-fifth text-fifth' } },
                                    { value: "Ayer", icon: { name: 'date', class: 'dark:text-dark-fifth text-fifth' } },
                                    { value: "Hace 7 dias", icon: { name: 'date', class: 'dark:text-dark-fifth text-fifth' } },
                                    { value: "Hace 1 mes", icon: { name: 'date', class: 'dark:text-dark-fifth text-fifth' } }
                                ]}
                                style={{ text: 'dark:text-dark-fifth text-fifth', border: 'dark:border-dark-fifth border-fifth', bg: 'dark:bg-dark-secondary bg-secondary' }}
                            />
                            <ComponentSelectStatic
                                title="Prioridad"
                                select={selectPriority}
                                setSelect={setSelectPriority}
                                items={[
                                    { value: 'Alta', icon: { name: 'arrow', class: 'dark:text-dark-fifth text-red-500 rotate-[-180deg]' } },
                                    { value: 'Media', icon: { name: 'arrow', class: 'dark:text-dark-fifth text-yellow-500 rotate-[-180deg]' } },
                                    { value: 'Baja', icon: { name: 'arrow', class: 'dark:text-dark-fifth text-green-500' } }
                                ]}
                                style={{ text: 'dark:text-dark-fifth text-fifth', border: 'dark:border-dark-fifth border-fifth', bg: 'dark:bg-dark-secondary bg-secondary' }}
                            />
                            <ComponentSelectStatic
                                title="Nota destacada"
                                select={selectFeatured}
                                setSelect={setSelectFeatured}
                                items={[
                                    { value: 'SI', icon: { name: 'star-fill', class: 'dark:text-dark-fifth text-fifth' } },
                                    { value: 'NO', icon: { name: 'star-half', class: 'dark:text-dark-fifth text-fifth' } }
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
                    <button onClick={() => restart()} title="Reiniciar filtro" className="w-full group dark:border-dark-fifth border-fifth border-opacity-50 dark:hover:border-dark-secondary hover:border-secondary border-[0.1px] px-3 rounded-md flex items-center justify-center py-[3px] gap-x-1 outline-none transition duration-500">
                        <ComponentIcon name="load" size={16} descriptionClass="dark:group-hover:text-dark-secondary group-hover:text-secondary group-hover:opacity-100 dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-70 cursor-pointer" />
                        <span className="dark:group-hover:text-dark-secondary group-hover:text-secondary group-hover:opacity-100 text-sm tracking-wider dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-70 duration-500">
                            Reiniciar filtro
                        </span>
                    </button>
                </div>
            </article>
            {
                (loadingMessage) && <ComponentMessageWait open={loadingMessage} setOpen={setLoadingMessage} />
            }
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
            {
                <ComponentMessageConfirmationDelete open={openConfirmationDelete} setOpen={setOpenConfirmationDelete} action={deleteNotes} />
            }
        </article>
    )
}