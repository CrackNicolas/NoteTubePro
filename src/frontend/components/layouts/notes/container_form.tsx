'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';

import ComponentIcon from '@/frontend/components/partials/icon';
import ComponentInput from '@/frontend/components/partials/form/input';
import ComponentLabel from '@/frontend/components/partials/form/label';
import ComponentMessageWait from '@/frontend/components/layouts/messages/wait';
import ComponentItemPriority from '@/frontend/components/partials/form/item_priority';
import ComponentItemFeatured from '@/frontend/components/partials/form/item_featured';
import ComponentMessageConfirmation from '@/frontend/components/layouts/messages/confirmation';

import { Request } from '@/backend/logic/requests';
import { Props_note } from '@/context/types/note';
import { Props_response } from '@/context/types/response';
import { Props_category } from '@/context/types/category';

type Props = {
    note_selected: Props_note | undefined,
    category_selected: Props_category | undefined,
    setCategory_selected: Dispatch<SetStateAction<Props_category | undefined>>
}

export default function ComponentContainerForm(props: Props): JSX.Element {
    const { category_selected, setCategory_selected, note_selected } = props;

    const router = useRouter();

    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB en bytes

    const [open, setOpen] = useState<boolean>(false);
    const [file, setFile] = useState<File | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<Props_response>();
    const [view_file, setView_file] = useState<string | undefined>(undefined);
    const [message_image, setMessage_image] = useState<{ paint: boolean, value: string }>({ paint: true, value: 'Selecciona una imagen (máximo 1MB)' });
    const [values_exists, setValues_exists] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm();

    const restart = (use_redirect: boolean): void => {
        reset();
        setFile(undefined);
        setValues_exists(false);
        if (use_redirect) {
            router.push((note_selected) ? '/notes/search' : '/dashboard/main');
        }
    }

    const open_modal = (data: Props_response): void => {
        restart(false);
        setOpen(true);
        setResponse(data);
    }

    const capture_file = (event: ChangeEvent<HTMLInputElement>): void => {
        const new_file = event.target.files?.[0];

        if (new_file && !new_file.type.startsWith('image/')) {
            event.target.value = "";
            setMessage_image({ paint: false, value: 'Solo se permiten imagenes' });
        } else if (new_file && new_file.size > MAX_FILE_SIZE) {
            event.target.value = "";
            setMessage_image({ paint: false, value: 'Tu imagen no debe superar 1MB.' });
        } else {
            setMessage_image({ paint: true, value: 'Imagen adecuada' });
            setFile(new_file);
            setView_file(URL.createObjectURL(new_file as File));
        }
    }

    const remove_file = (): void => {
        setFile(undefined);
        (document.getElementById("file-upload") as HTMLInputElement).value = "";
        setView_file(undefined);
        setMessage_image({ paint: true, value: 'Selecciona una imagen (máximo 1MB)' });
    }

    const onSubmit: SubmitHandler<FieldValues | Props_note> = async (data): Promise<void> => {
        if (data.title == data.description) {
            setValues_exists(true);
            return;
        }

        let response;

        const form = new FormData();
        form.set('title', data.title);
        form.set('description', data.description);
        form.set('priority', data.priority);
        form.set('featured', data.featured);
        form.set('category', JSON.stringify(category_selected));

        if (file !== undefined) {
            form.set('file', file as File);
        }

        setLoading(true);
        if (!note_selected) {
            response = await Request('POST',"/api/notes", form);
        } else {
            form.set('_id', note_selected._id as string);
            response = await Request('PUT',"/api/notes", form);
        }
        setLoading(false);
        open_modal(response.data);
    }

    const reply = (): void => {
        setOpen(false);
        router.push('/notes/search');
    }

    useEffect(() => {
        reset();
        setValue('title', note_selected?.title);
        setValue('description', note_selected?.description);
        setValue('priority', note_selected?.priority);
        setValue('featured', note_selected?.featured ? 'SI' : 'NO');
        setValue('category', note_selected?.category);

        if (note_selected?.file?.id) {
            setView_file(note_selected?.file?.url)
            setMessage_image({ paint: true, value: 'Imagen adecuada' });
        }

        if (note_selected?.category) {
            setCategory_selected(note_selected.category);
        }
    }, [note_selected, reset, setCategory_selected, setValue])

    return (
        <div className={`flex flex-col mt-[-23px] gap-y-4 w-full sm:w-[450px] mx-auto`}>
            <div className="relative flex justify-center items-center">
                {
                    (!note_selected) && (
                        <span onClick={() => setCategory_selected(undefined)} className="absolute left-0 dark:bg-dark-primary bg-primary rounded-full p-1 dark:hover:bg-dark-room hover:bg-room transition duration-5" title="Volver atras">
                            <ComponentIcon name="return" size={22} description_class="rotate-[-180deg] dark:text-dark-secondary text-secondary cursor-pointer" />
                        </span>
                    )
                }
                <span title="Titulo formulario" className="text-2xl dark:text-dark-secondary text-secondary font-semibold text-center tracking-wider">
                    {(!note_selected) ? 'Crear nota' : 'Actualizar nota'}
                </span>
                <span className="absolute right-0" title={`Categoria ${category_selected?.title}`}>
                    <ComponentIcon name={(note_selected) ? note_selected?.category.icon : category_selected?.icon} size={24} description_class="dark:text-dark-secondary text-secondary" />
                </span>
            </div>
            <form method="POST" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title="Titulo" html_for="title" errors={errors} />
                        <ComponentInput
                            type="text"
                            name="title"
                            error={errors.title?.type}
                            register={register}
                            placeholder="Escriba el titulo..."
                            description_class="border-opacity-50 dark:bg-dark-primary bg-primary w-full rounded-md border-[0.1px] py-1 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                        />
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel values_exists={values_exists} title="Descripcion" html_for="description" errors={errors} />
                        <ComponentInput
                            rows={3}
                            name="description"
                            error={errors.description?.type}
                            register={register}
                            placeholder="Escriba la descripcion..."
                            description_class="border-opacity-50 dark:bg-dark-primary bg-primary w-full rounded-md border-[0.1px] min-h-[65px] scroll-text py-1 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                        />
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title="Prioridad" html_for="priority" errors={errors} />
                        <div className="grid grid-cols-3 gap-x-1">
                            <ComponentItemPriority
                                id="option_1"
                                value='Alta'
                                paint={watch('priority') === "Alta"}
                                error={errors.priority?.type}
                                register={register}
                                class_icon="text-red-500 rotate-[-180deg]"
                            />
                            <ComponentItemPriority
                                id="option_2"
                                value='Media'
                                paint={watch('priority') === "Media"}
                                error={errors.priority?.type}
                                register={register}
                                class_icon="text-yellow-500 rotate-[-180deg]"
                            />
                            <ComponentItemPriority
                                id="option_3"
                                value='Baja'
                                paint={watch('priority') === "Baja"}
                                error={errors.priority?.type}
                                register={register}
                                class_icon="text-green-500"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 items-center my-1">
                        <ComponentLabel title="¿Destacar nota?" html_for="featured" errors={errors} />
                        <div className='flex w-full gap-x-2'>
                            <ComponentItemFeatured
                                value='SI'
                                paint={watch('featured') === 'SI'}
                                error={errors.featured?.type}
                                register={register}
                            />
                            <ComponentItemFeatured
                                value='NO'
                                paint={watch('featured') === 'NO'}
                                error={errors.featured?.type}
                                register={register}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <div className="flex justify-between items-center">
                            <ComponentLabel title={message_image.value} html_for="" color={message_image.paint ? 'dark:text-dark-secondary text-secondary' : 'dark:text-dark-error text-error'} />
                            {
                                (view_file) && (
                                    <button onClick={() => remove_file()} type="button" name="Quitar imagen" title="Quitar imagen" className="dark:text-dark-secondary text-secondary bg-primary dark:bg-dark-primary hover:bg-secondary dark:hover:bg-dark-secondary hover:text-primary dark:hover:text-dark-primary text-[12.3px] border border-[0.1px] border-secondary dark:border-dark-secondary px-2 rounded-md font-semibold tracking-wider">
                                        Quitar imagen
                                    </button>
                                )
                            }
                        </div>
                        <label htmlFor="file-upload" title="Seleccionar para subir una imagen" className="grid gap-y-0.5 place-items-center mt-0.5 p-1 cursor-pointer dark:border-dark-secondary border-secondary border-opacity-20 dark:bg-dark-primary bg-primary w-full rounded-md border-[0.1px] cursor-pointer hover:border-opacity-60 transition duration-500">
                            {
                                ((!file || !note_selected?.file?.id) && (!view_file)) ?
                                    <ComponentIcon name="upload-file" size={27} description_class="icon-home dark:text-dark-secondary text-secondary cursor-pointer" />
                                    :
                                    <Image src={(view_file) ? view_file : ""} alt="" width={60} height={60} className="max-w-[70px] max-h-[70px] rounded-md" />
                            }

                            <span className='line-clamp-1 dark:text-dark-secondary text-secondary text-md font-normal tracking-wide'>
                                {
                                    (!file || !note_selected?.file?.id) && (!view_file) && "Subir imagen..."
                                }
                            </span>
                            <input id="file-upload" accept="image/*" name="file-upload" type="file" onChange={event => capture_file(event)} className="sr-only" />
                        </label>
                    </div>
                </div>
                <div className="flex gap-x-10">
                    <button type="submit" title="Guardar" name="Guardar" className="relative flex w-full justify-center rounded-md dark:text-dark-secondary text-secondary border-[0.1px] dark:border-dark-secondary border-secondary border-opacity-80 px-3 py-1 text-md font-normal hover:font-semibold dark:bg-dark-primary bg-primary tracking-wider dark:hover:bg-dark-sixth hover:bg-sixth outline-none">
                        Guardar
                    </button>
                    <button onClick={() => restart(true)} type="button" name="Deshacer" title="Deshacer" className="relative flex w-full justify-center rounded-md dark:text-dark-error text-error border-[0.1px] dark:border-dark-error border-error border-opacity-80 px-3 py-1 text-md font-normal hover:font-semibold dark:bg-dark-primary bg-primary tracking-wider dark:hover:bg-dark-sixth hover:bg-sixth outline-none">
                        Deshacer
                    </button>
                </div>
            </form>
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} reply={reply} button_close={false} />
            }
            {
                (loading) && <ComponentMessageWait open={loading} setOpen={setLoading} />
            }
        </div >
    )
}