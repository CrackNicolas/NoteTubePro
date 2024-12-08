import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentList from "@/frontend/components/layouts/search/list";
import ComponentMessageWait from "@/frontend/components/layouts/messages/wait";
import ComponentInputSearch from "@/frontend/components/layouts/search/input_search";
import ComponentSelectStatic from "@/frontend/components/partials/form/select_static";
import ComponentButtonCreate from "@/frontend/components/layouts/search/button_create";
import ComponentSelectDynamic from "@/frontend/components/partials/form/select_dynamic";
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";
import ComponentMessageConfirmationDelete from "@/frontend/components/layouts/messages/confirmation_delete";

import { Request } from "@/backend/logic/requests";
import { Props_response } from "@/context/types/response";
import { Props_category } from "@/context/types/category";
import { Props_delete_note, Props_note } from "@/context/types/note";
import { Props_loading_notes, Props_params_search } from "@/frontend/types/props";

type Props = {
    update_note: (note: Props_note) => void
}

export default function ComponentSearch(props: Props): JSX.Element {
    const { update_note } = props;

    const { register, watch, setValue } = useForm();

    const title = watch('title');

    const ref_nav_toggle = useRef<HTMLDivElement>(null);
    const ref_button_view_toggle = useRef<HTMLButtonElement>(null);
    const ref_button_close_toggle = useRef<HTMLButtonElement>(null);
    const ref_button_delete_note = useRef<HTMLButtonElement>(null);
    const ref_button_create_note = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [response, setResponse] = useState<Props_response>();
    const [list_notes, setList_notes] = useState<Props_note[]>([]);
    const [select_date, setSelect_date] = useState<string | undefined>('Fecha...');
    const [view_filter, setView_filter] = useState<boolean>(false);
    const [state_select, setState_select] = useState<boolean>(false);
    const [loading_notes, setLoading_notes] = useState<Props_loading_notes>();
    const [notes_selected, setNotes_selected] = useState<Props_delete_note[]>([]);
    const [loading_message, setLoading_message] = useState<boolean>(false);
    const [select_category, setSelect_category] = useState<Props_category>({ title: 'Categoria...' });
    const [select_priority, setSelect_priority] = useState<string | undefined>('Prioridad...');
    const [select_featured, setSelect_featured] = useState<string | undefined>('Nota destacada...');
    const [open_confirmation_delete, setOpen_confirmation_delete] = useState<boolean>(false);

    const handle_click_outside = (event: MouseEvent): void => {
        if (ref_nav_toggle.current &&
            !ref_nav_toggle.current.contains(event.target as Node) &&
            !ref_button_close_toggle.current?.contains(event.target as Node) &&
            !ref_button_view_toggle.current?.contains(event.target as Node) &&
            !ref_button_delete_note.current?.contains(event.target as Node) &&
            !ref_button_create_note.current?.contains(event.target as Node)
        ) {
            setView_filter(false);
        }
    };

    const restart = (): void => {
        setSelect_category({ title: 'Categoria...' });
        setSelect_priority('Prioridad...');
        setSelect_featured('Nota destacada...');
        setSelect_date('Fecha...');
    }

    const close_delete = (): void => {
        setState_select(false);
        setSearch('');
    }

    const select_note = (value: boolean): void => {
        setState_select(value);
        setNotes_selected([]);
    }

    const note_all: boolean = (notes_selected.length === list_notes.length);

    const select_all = (): void => {
        if (note_all) {
            setNotes_selected([]);
            return;
        }
        list_notes.map((note: Props_note) => {
            if (!notes_selected.map((note: Props_delete_note) => note._id).includes(note._id)) {
                setNotes_selected(prev => [...prev, { _id: note._id, file: note.file?.id }])
            }
        })
    }

    const load_notes = useCallback(async (): Promise<void> => {
        if (search == "") return;

        setLoading_notes({ value: true, button: true });
        const { data } = await Request({ type: 'GET', url: `/api/notes${(search !== '{}') ? `/${search}` : ''}` });
        if (data.status === 200) {
            setLoading_notes({
                value: false,
                icon: `emoji-${search === '{}' ? 'without' : 'search'}-notes`,
                description: (search === '{}') ? '¡Ups! aun no tienes tu primer nota' : 'No se encontraron resultados',
                button: (search === '{}')
            });
            setList_notes(data.data);
        }
        if (data.status === 500) {
            setOpen(true);
            setResponse(data);
            setList_notes([]);
            setLoading_notes({ value: false });
        }
    }, [search]);

    const listen_to_changes = useCallback(async (): Promise<void> => {
        const criteria: Props_params_search = {
            title: (title !== '') ? title : undefined,
            category: (select_category.title !== 'Categoria...') ? select_category : undefined,
            priority: (select_priority !== 'Prioridad...') ? select_priority : undefined,
            dates: (select_date !== 'Fecha...') ? select_date : undefined,
            featured: (select_featured !== 'Nota destacada...') ? (select_featured === 'SI') : undefined,
        }

        setSearch(JSON.stringify(criteria));
    }, [title, select_category, select_priority, select_date, select_featured])

    const delete_notes = async (): Promise<void> => {
        setLoading_message(true);
        const { data } = await Request({ type: 'DELETE', url: `/api/notes/${JSON.stringify(notes_selected)}` });
        if (data.status === 200) {
            setOpen(true);
            setResponse(data);
            load_notes();
            setState_select(false);
            setLoading_message(false);
            setNotes_selected([]);
            restart();
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handle_click_outside);
        return () => document.removeEventListener('mousedown', handle_click_outside);
    }, []);

    useEffect(() => {
        load_notes();
    }, [search, load_notes]);

    useEffect(() => {
        listen_to_changes();
    }, [title, select_category, select_priority, select_featured, select_date, listen_to_changes]);

    return (
        <article className={`relative h-[calc(100vh-30px)] flex flex-col gap-5 mt-[30px] pt-6`}>
            <article className={`fixed pb-3 max-w-7xl pr-[29px] sm:pr-[85px] z-50 flex gap-y-6 gap-x-3 justify-between items-center dark:bg-dark-primary bg-primary transition-width ${view_filter ? 'w-full sz:w-full md:w-[calc(100%-175px)]' : 'w-full'}`}>
                {
                    state_select ?
                        <div className="flex gap-x-3">
                            <span title={note_all ? "Desmarcar todo" : "Marcar todo"} onClick={() => select_all()} className={`my-auto border-[0.1px] cursor-pointer ${note_all ? ' dark:border-dark-error border-error dark:bg-dark-primary bg-primary rounded-full px-[0.5px] ' : 'dark:border-dark-secondary border-secondary rounded-sm'}`}>
                                <ComponentIcon
                                    name='check'
                                    size={12}
                                    description_class={`cursor-pointer ${note_all ? 'dark:text-dark-error text-error m-auto mt-[1px] icon-transition icon-visible' : 'dark:text-dark-secondary text-secondary transition-width icon-transition icon-hidden'} `}
                                />
                            </span>
                            <div className="flex gap-x-1.5">
                                {
                                    (notes_selected.length !== 0) && (
                                        <button type="button" title="Eliminar" onClick={() => setOpen_confirmation_delete(true)} className="group cursor-pointer dark:hover:bg-dark-error hover:bg-error border-[0.1px] dark:border-dark-error border-error outline-none rounded-md px-2.5 py-[0.6px] " >
                                            <span className="dark:group-hover:text-dark-primary group-hover:text-primary dark:text-dark-error text-error text-sm group-hover:font-semibold font-normal tracking-wider transition duration-500">
                                                Eliminar
                                            </span>
                                        </button>
                                    )
                                }
                                <button type="button" title="Cancelar eliminacion" onClick={() => close_delete()} className="group cursor-pointer dark:hover:bg-dark-error hover:bg-error border-[0.1px] dark:border-dark-error border-error outline-none rounded-md px-2.5 py-[0.6px] " >
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
                    <div ref={ref_button_create_note}>
                        <ComponentButtonCreate />
                    </div>
                    {
                        !state_select && (
                            <button ref={ref_button_delete_note} type="button" title="Eliminar notas" onClick={() => select_note(true)} className={`outline-none ${list_notes.length === 0 && 'hidden'}`} >
                                <ComponentIcon name="delete" description_class="cursor-pointer dark:hover:text-dark-error hover:text-error dark:text-dark-fifth text-fifth" size={20} view_box="0 0 16 16" />
                            </button>
                        )
                    }
                    {
                        !view_filter && (
                            <button ref={ref_button_view_toggle} onClick={() => setView_filter(!view_filter)} type="button" title="Filtros" className="outline-none">
                                <ComponentIcon name="filter" description_class="cursor-pointer dark:hover:text-dark-secondary hover:text-secondary dark:text-dark-fifth text-fifth" size={24} view_box="0 0 16 16" />
                            </button>
                        )
                    }
                </div>
            </article>
            <article className="flex pb-10 pt-12">
                <ComponentList
                    state={state_select}
                    notes={list_notes}
                    loading={loading_notes}
                    update_note={update_note}
                    notes_selected={notes_selected}
                    setNotes_selected={setNotes_selected}
                    description_class={`transition-width ${view_filter ? 'w-full sz:w-full md:w-[calc(100%-175px)]' : 'w-full'}`}
                />
                <div ref={ref_nav_toggle} className={`fixed top-0 flex flex-col justify-between toggle-search ${view_filter ? 'translate-x-0' : 'translate-x-[120%]'} right-0 dark:bg-dark-primary bg-primary z-50 w-[200px] border-fifth border-opacity-50 border-l-[0.1px] p-2 h-[100vh]`}>
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center py-1 border-b-[3px] rounded-md border-opacity-50 dark:border-dark-secondary border-secondary w-full">
                            <h4 className="dark:text-dark-tertiary text-tertiary opacity-70 tracking-wider font-semibold">
                                Filtrar notas
                            </h4>
                            <button ref={ref_button_close_toggle} type="button" title="Cerrar menu" onClick={() => setView_filter(!view_filter)} className="outline-none">
                                <ComponentIcon name="close" description_class="cursor-pointer dark:hover:text-dark-secondary hover:text-secondary hover:opacity-100 dark:text-dark-tertiary text-tertiary opacity-70" size={27} view_box="0 0 16 16" />
                            </button>
                        </div>
                        <div className="relative flex flex-col gap-y-3 py-3 w-full">
                            {
                                state_select && <ComponentInputSearch setValue={setValue} design={state_select} />
                            }
                            <ComponentSelectStatic
                                title="Fecha"
                                select={select_date}
                                setSelect={setSelect_date}
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
                                select={select_priority}
                                setSelect={setSelect_priority}
                                items={[
                                    { value: 'Alta', icon: { name: 'arrow', class: 'dark:text-dark-fifth text-red-500 rotate-[-180deg]' } },
                                    { value: 'Media', icon: { name: 'arrow', class: 'dark:text-dark-fifth text-yellow-500 rotate-[-180deg]' } },
                                    { value: 'Baja', icon: { name: 'arrow', class: 'dark:text-dark-fifth text-green-500' } }
                                ]}
                                style={{ text: 'dark:text-dark-fifth text-fifth', border: 'dark:border-dark-fifth border-fifth', bg: 'dark:bg-dark-secondary bg-secondary' }}
                            />
                            <ComponentSelectStatic
                                title="Nota destacada"
                                select={select_featured}
                                setSelect={setSelect_featured}
                                items={[
                                    { value: 'SI', icon: { name: 'star-fill', class: 'dark:text-dark-fifth text-fifth' } },
                                    { value: 'NO', icon: { name: 'star-half', class: 'dark:text-dark-fifth text-fifth' } }
                                ]}
                                style={{ text: 'dark:text-dark-fifth text-fifth', border: 'dark:border-dark-fifth border-fifth', bg: 'dark:bg-dark-secondary bg-secondary' }}
                            />
                            <ComponentSelectDynamic
                                select_category={select_category}
                                setSelect_category={setSelect_category}
                                register={register}
                                style={{ text: 'dark:text-dark-fifth text-fifth', border: 'dark:border-dark-fifth border-fifth' }}
                            />
                        </div>
                    </div>
                    <button onClick={() => restart()} title="Reiniciar filtro" className="w-full group border dark:border-dark-fifth border-fifth border-opacity-50 dark:hover:border-dark-secondary hover:border-secondary border-[0.1px] px-3 rounded-md flex items-center justify-center py-[3px] gap-x-1 outline-none transition duration-500">
                        <ComponentIcon name="load" size={16} description_class="dark:group-hover:text-dark-secondary group-hover:text-secondary group-hover:opacity-100 dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-70 cursor-pointer" />
                        <span className="dark:group-hover:text-dark-secondary group-hover:text-secondary group-hover:opacity-100 text-sm tracking-wider dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-70 duration-500">
                            Reiniciar filtro
                        </span>
                    </button>
                </div>
            </article>
            {
                (loading_message) && <ComponentMessageWait open={loading_message} setOpen={setLoading_message} />
            }
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
            {
                <ComponentMessageConfirmationDelete open={open_confirmation_delete} setOpen={setOpen_confirmation_delete} action={delete_notes} />
            }
        </article>
    )
}