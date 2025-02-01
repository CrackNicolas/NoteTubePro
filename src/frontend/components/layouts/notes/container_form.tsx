'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, useEffect, useState } from 'react';

import { Component } from '@/frontend/types/component';
import { APP_ROUTES } from '@/frontend/constant/app_rutes';

import { PropsNote } from '@/context/types/note';
import { PropsResponse } from '@/context/types/response';
import { PropsCategory } from '@/context/types/category';
import { PropsDispatchCategoryNotRequired } from '@/frontend/types/dispatch';

import { httpRequest } from '@/backend/logic/requests';
import { ConditionFile } from '@/backend/enums/condition_file';

import ComponentIcon from '@/frontend/components/partials/icon';
import ComponentInput from '@/frontend/components/partials/form/input';
import ComponentLabel from '@/frontend/components/partials/form/label';
import ComponentMessageWait from '@/frontend/components/layouts/messages/wait';
import ComponentItemPriority from '@/frontend/components/partials/form/item_priority';
import ComponentItemFeatured from '@/frontend/components/partials/form/item_featured';
import ComponentMessageConfirmation from '@/frontend/components/layouts/messages/confirmation';

interface IContainerForm {
    noteSelected?: PropsNote,
    categorySelected?: PropsCategory,
    setCategorySelected: PropsDispatchCategoryNotRequired
}

export default function ComponentContainerForm(props: IContainerForm): Component {
    const { categorySelected, setCategorySelected, noteSelected } = props;

    const router = useRouter();

    const MAX_FILE_SIZE: number = 1 * 1024 * 1024; // 1MB en bytes

    const [open, setOpen] = useState<boolean>(false);
    const [file, setFile] = useState<File | string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<PropsResponse>();
    const [viewFile, setViewFile] = useState<string | undefined>(undefined);
    const [messageImage, setMessageImage] = useState<{ paint: boolean, value: string }>({ paint: true, value: 'Selecciona una imagen (máximo 1MB)' });
    const [valuesExists, setValuesExists] = useState<boolean>(false);
    const [confirmationDeleteFile, setConfirmationDeleteFile] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm();

    const restart = (use_redirect: boolean): void => {
        reset();
        setFile(undefined);
        setValuesExists(false);
        if (use_redirect) {
            router.push((noteSelected) ? APP_ROUTES.notes.search : APP_ROUTES.dashboard.main);
        }
    }

    const openModal = (data: PropsResponse): void => {
        restart(false);
        setOpen(true);
        setResponse(data);
    }

    const captureFile = (event: ChangeEvent<HTMLInputElement>): void => {
        const newFile: File | undefined = event.target.files?.[0];

        if (newFile && !newFile.type.startsWith('image/')) {
            event.target.value = "";
            setMessageImage({ paint: false, value: 'Solo se permiten imagenes' });
        } else if (newFile && newFile.size > MAX_FILE_SIZE) {
            event.target.value = "";
            setMessageImage({ paint: false, value: 'Tu imagen no debe superar 1MB.' });
        } else {
            setMessageImage({ paint: true, value: 'Imagen adecuada' });
            setFile(newFile);
            setViewFile(URL.createObjectURL(newFile as File));
            setConfirmationDeleteFile(false);
        }
    }

    const removeFile = (): void => {
        setFile(undefined);
        (document.getElementById("file-upload") as HTMLInputElement).value = "";
        setViewFile(undefined);
        setMessageImage({ paint: true, value: 'Selecciona una imagen (máximo 1MB)' });
        setConfirmationDeleteFile(!confirmationDeleteFile);
    }

    const onSubmit: SubmitHandler<FieldValues | PropsNote> = async (data): Promise<void> => {
        if (data.title == data.description) {
            setValuesExists(true);
            return;
        }

        let response;

        const form = new FormData();
        form.set('title', data.title);
        form.set('description', data.description);
        form.set('priority', data.priority);
        form.set('featured', data.featured);
        form.set('category', JSON.stringify(categorySelected));

        setLoading(true);
        if (!noteSelected) {
            if (file !== undefined) {
                form.set('file', file as File);
            }
            response = await httpRequest({ type: 'POST', url: "/api/notes", body: form });
        } else {
            if (file) {
                form.set('file', file as File);
                form.set('conditionFile', JSON.stringify(ConditionFile.MODIFY));
            }
            if (noteSelected?.file?.id && !file) {
                if (confirmationDeleteFile) {
                    form.set('conditionFile', JSON.stringify(ConditionFile.DELETE));
                } else {
                    form.set('conditionFile', JSON.stringify(ConditionFile.NOT_EDIT));
                }
            }

            form.set('_id', noteSelected._id as string);
            response = await httpRequest({ type: 'PUT', url: "/api/notes", body: form });
        }
        setLoading(false);
        openModal(response.data);
    }

    const reply = (): void => {
        setOpen(false);
        router.push(APP_ROUTES.notes.search);
    }

    useEffect(() => {
        reset();
        setValue('title', noteSelected?.title);
        setValue('description', noteSelected?.description);
        setValue('priority', noteSelected?.priority);
        setValue('featured', noteSelected?.featured ? 'SI' : 'NO');
        setValue('category', noteSelected?.category);

        if (noteSelected?.file?.id) {
            setViewFile(noteSelected?.file?.url)
            setMessageImage({ paint: true, value: 'Imagen adecuada' });
        }

        if (noteSelected?.category) {
            setCategorySelected(noteSelected.category);
        }
    }, [noteSelected, reset, setCategorySelected, setValue])

    return (
        <div className={`flex flex-col mt-[-23px] gap-y-4 w-full sm:w-[450px] mx-auto`}>
            <div className="relative flex justify-center items-center">
                {
                    (!noteSelected) && (
                        <span onClick={() => setCategorySelected(undefined)} className="absolute left-0 dark:bg-dark-primary bg-primary rounded-full p-1 dark:hover:bg-dark-room hover:bg-room transition duration-5" title="Volver atras">
                            <ComponentIcon name="return" size={22} descriptionClass="rotate-[-180deg] dark:text-dark-secondary text-secondary cursor-pointer" />
                        </span>
                    )
                }
                <span title="Titulo formulario" className="text-2xl text-gradient font-semibold text-center tracking-wider">
                    {(!noteSelected) ? 'Crear nota' : 'Actualizar nota'}
                </span>
                <span className="absolute right-0" title={`Categoria ${categorySelected?.title}`}>
                    <ComponentIcon name={(noteSelected) ? noteSelected?.category.icon : categorySelected?.icon} size={24} descriptionClass="text-secondary text-opacity-60 dark:text-seventh" />
                </span>
            </div>
            <form method="POST" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title="Titulo" htmlFor="title" errors={errors} />
                        <ComponentInput
                            type="text"
                            name="title"
                            error={errors.title?.type}
                            register={register}
                            placeholder="Escriba el titulo..."
                            descriptionClass="border-opacity-50 dark:bg-dark-primary bg-primary w-full rounded-md border-[0.1px] py-1 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                        />
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel valuesExists={valuesExists} title="Descripcion" htmlFor="description" errors={errors} />
                        <ComponentInput
                            rows={3}
                            name="description"
                            error={errors.description?.type}
                            register={register}
                            placeholder="Escriba la descripcion..."
                            descriptionClass="border-opacity-50 dark:bg-dark-primary bg-primary w-full rounded-md border-[0.1px] min-h-[65px] scroll-text py-1 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                        />
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title="Prioridad" htmlFor="priority" errors={errors} />
                        <div className="grid grid-cols-3 gap-x-1">
                            <ComponentItemPriority
                                id="option_1"
                                value='Alta'
                                paint={watch('priority') === "Alta"}
                                error={errors.priority?.type}
                                register={register}
                                descriptionClass="text-red-500 rotate-[-180deg]"
                            />
                            <ComponentItemPriority
                                id="option_2"
                                value='Media'
                                paint={watch('priority') === "Media"}
                                error={errors.priority?.type}
                                register={register}
                                descriptionClass="text-yellow-500 rotate-[-180deg]"
                            />
                            <ComponentItemPriority
                                id="option_3"
                                value='Baja'
                                paint={watch('priority') === "Baja"}
                                error={errors.priority?.type}
                                register={register}
                                descriptionClass="text-green-500"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 items-center my-1">
                        <ComponentLabel title="¿Destacar nota?" htmlFor="featured" errors={errors} />
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
                            <ComponentLabel title={messageImage.value} htmlFor="" color={messageImage.paint ? 'dark:text-dark-secondary text-secondary' : 'dark:text-dark-error text-error'} />
                            {
                                (viewFile) && (
                                    <button onClick={() => removeFile()} type="button" name="Quitar imagen" title="Quitar imagen" className="group flex gap-x-1.5 items-center border-[0.1px] bg-custom-gradient border-none px-2 rounded-md">
                                        <ComponentIcon name='image' size={10} descriptionClass="group-hover:text-tertiary text-primary" />
                                        <span className="text-[12.3px] group-hover:text-tertiary text-primary font-semibold tracking-wider transition duration-500">
                                            Quitar imagen
                                        </span>
                                    </button>
                                )
                            }
                        </div>
                        <label htmlFor="file-upload" title="Seleccionar para subir una imagen" className="grid gap-y-0.5 place-items-center mt-0.5 p-1 dark:border-dark-secondary border-secondary border-opacity-20 dark:bg-dark-primary bg-primary w-full rounded-md border-[0.1px] cursor-pointer hover:border-opacity-60 transition duration-500">
                            {
                                ((!file || !noteSelected?.file?.id) && (!viewFile)) ?
                                    <ComponentIcon name="upload-file" size={27} descriptionClass="icon-home dark:text-dark-secondary text-secondary cursor-pointer" />
                                    :
                                    <Image src={viewFile ?? ""} alt="" width={60} height={60} className="max-w-[70px] max-h-[70px] rounded-md" />
                            }

                            <span className='line-clamp-1 dark:text-dark-secondary text-secondary text-md font-normal tracking-wide'>
                                {
                                    (!file || !noteSelected?.file?.id) && (!viewFile) && "Subir imagen..."
                                }
                            </span>
                            <input id="file-upload" accept="image/*" name="file-upload" type="file" onChange={event => captureFile(event)} className="sr-only" />
                        </label>
                    </div>
                </div>
                <div className="flex gap-x-10">
                    <button type="submit" title="Guardar" name="Guardar" className="relative flex w-full justify-center rounded-md hover:text-tertiary text-primary border-[0.1px] border-none px-3 py-1 text-md font-normal hover:font-semibold bg-custom-gradient tracking-wider outline-none">
                        Guardar
                    </button>
                    <button onClick={() => restart(true)} type="button" name="Deshacer" title="Deshacer" className="relative flex hover:text-tertiary text-primary w-full justify-center rounded-md bg-custom-gradient-red px-3 py-1 text-md font-normal hover:font-semibold tracking-wider outline-none">
                        Deshacer
                    </button>
                </div>
            </form>
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} reply={reply} buttonClose={false} />
            }
            {
                (loading) && <ComponentMessageWait open={loading} setOpen={setLoading} />
            }
        </div >
    )
}