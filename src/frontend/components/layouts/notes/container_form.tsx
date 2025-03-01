'use client'

import Image from 'next/image';
import { HttpStatusCode } from 'axios';
import { useRouter } from 'next/navigation';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, useEffect, useState } from 'react';

import { Component } from '@/frontend/types/component';
import { APP_ROUTES } from '@/frontend/constant/app_rutes';

import { PropsNote } from '@/context/types/note';
import { PropsResponse } from '@/shared/types/response';
import { PropsCategory } from '@/context/types/category';
import { PropsDispatchCategoryNotRequired } from '@/frontend/types/dispatch';

import { httpRequest } from '@/shared/logic/requests';
import { ValueBoolean } from '@/frontend/enums/boolean';
import { ConditionFile } from '@/backend/enums/condition_file';
import { ValuePriority } from '@/shared/enums/note/priority';

import useAppTranslation from '@/shared/hooks/translation';

import ComponentIcon from '@/frontend/components/partials/icon';
import ComponentInput from '@/frontend/components/partials/form/input';
import ComponentLabel from '@/frontend/components/partials/form/label';
import ComponentMessageWait from '@/frontend/components/layouts/messages/wait';
import ComponentItemPriority from '@/frontend/components/partials/form/item_priority';
import ComponentItemFeatured from '@/frontend/components/partials/form/item_featured';
import ComponentButtonGoBack from '@/frontend/components/partials/button_go_back';
import ComponentMessageConfirmation from '@/frontend/components/layouts/messages/confirmation';

interface IContainerForm {
    noteSelected?: PropsNote,
    categorySelected?: PropsCategory,
    setCategorySelected: PropsDispatchCategoryNotRequired
}

export default function ComponentContainerForm(props: IContainerForm): Component {
    const { categorySelected, setCategorySelected, noteSelected } = props;

    const { translate } = useAppTranslation();

    const router = useRouter();

    const MAX_FILE_SIZE: number = 1 * 1024 * 1024; // 1MB en bytes

    const [open, setOpen] = useState<boolean>(false);
    const [file, setFile] = useState<File | string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<PropsResponse>();
    const [viewFile, setViewFile] = useState<string | undefined>(undefined);
    const [messageImage, setMessageImage] = useState<{ paint: boolean, value: string }>({ paint: true, value: translate('notes.form.items.image.title.init') });
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
        setOpen(true);
        setResponse(data);
    }

    const captureFile = (event: ChangeEvent<HTMLInputElement>): void => {
        const newFile: File | undefined = event.target.files?.[0];

        if (newFile && !newFile.type.startsWith('image/')) {
            event.target.value = "";
            setMessageImage({ paint: false, value: translate('notes.form.items.image.title.error_1') });
        } else if (newFile && newFile.size > MAX_FILE_SIZE) {
            event.target.value = "";
            setMessageImage({ paint: false, value: translate('notes.form.items.image.title.error_2') });
        } else {
            setMessageImage({ paint: true, value: translate('notes.form.items.image.title.exito') });
            setFile(newFile);
            setViewFile(URL.createObjectURL(newFile as File));
            setConfirmationDeleteFile(false);
        }
    }

    const removeFile = (): void => {
        setFile(undefined);
        (document.getElementById("file-upload") as HTMLInputElement).value = "";
        setViewFile(undefined);
        setMessageImage({ paint: true, value: translate('notes.form.items.image.title.init') });
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
                form.set('conditionFile', JSON.stringify(confirmationDeleteFile ? ConditionFile.DELETE : ConditionFile.NOT_EDIT));
            }

            form.set('_id', noteSelected._id as string);
            response = await httpRequest({ type: 'PUT', url: "/api/notes", body: form });
        }
        setLoading(false);
        openModal(response.data);
    }

    const reply = (): void => {
        setOpen(false);
        if (response?.status === HttpStatusCode.Created || response?.status === HttpStatusCode.Ok) {
            restart(false);
            router.push(APP_ROUTES.notes.search);
        }
    }

    const reload = (): void => {
        reset();
        setValue('title', noteSelected?.title);
        setValue('description', noteSelected?.description);
        setValue('priority', noteSelected?.priority);
        setValue('featured', noteSelected?.featured ? ValueBoolean.YEAH : ValueBoolean.NOT);
        setValue('category', noteSelected?.category);

        if (noteSelected?.file?.id) {
            setViewFile(noteSelected?.file?.url)
        }
        setMessageImage({ paint: true, value: (noteSelected?.file?.id || file) ? translate('notes.form.items.image.title.exito') : translate('notes.form.items.image.title.init') });

        if (noteSelected?.category) {
            setCategorySelected(noteSelected.category);
        }
    }

    useEffect(() => window.scroll(0, 0), []);
    useEffect(() => reload(), [translate('notes.form.items.image.title')]);
    useEffect(() => reload(), [noteSelected, reset, setCategorySelected, setValue]);

    return (
        <div className={`flex flex-col mt-[-23px] gap-y-2 w-full sm:w-[470px] mb-10 sm:mb-0 mx-auto`}>
            <div className="relative flex justify-center items-center">
                {(!noteSelected) && <ComponentButtonGoBack onClick={() => setCategorySelected(undefined)} descriptionClass="left-0 p-1" />}
                <span title={translate('notes.form.title.details')} className="text-2xl text-gradient font-semibold text-center tracking-wider">
                    {(!noteSelected) ? translate('notes.form.title.create') : translate('notes.form.title.update')}
                </span>
                <span className="absolute right-0" title={`${translate('categories.default')} ${translate(`categories.items.${categorySelected?.icon}`)}`}>
                    <ComponentIcon name={(noteSelected) ? noteSelected?.category.icon : categorySelected?.icon} size={24} descriptionClass="text-secondary text-opacity-60 dark:text-seventh" />
                </span>
            </div>
            <form method="POST" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title={translate('notes.form.items.title.label')} htmlFor="title" errors={errors} />
                        <ComponentInput
                            type="text"
                            name="title"
                            error={errors.title?.type}
                            register={register}
                            placeholder={`${translate('notes.form.items.title.input')}...`}
                            descriptionClass="border-opacity-50 dark:bg-dark-primary bg-primary w-full rounded-md border-[0.1px] py-1 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                        />
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel valuesExists={valuesExists} title={translate('notes.form.items.description.label')} htmlFor="description" errors={errors} />
                        <ComponentInput
                            rows={3}
                            name="description"
                            error={errors.description?.type}
                            register={register}
                            placeholder={`${translate('notes.form.items.description.input')}...`}
                            descriptionClass="border-opacity-50 dark:bg-dark-primary bg-primary w-full rounded-md border-[0.1px] min-h-[65px] py-1 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                        />
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title={translate('notes.form.items.priority.label')} htmlFor="priority" errors={errors} />
                        <div className="grid grid-cols-3 gap-x-1">
                            <ComponentItemPriority
                                id="option_1"
                                value={ValuePriority.High}
                                paint={watch('priority') === ValuePriority.High}
                                error={errors.priority?.type}
                                register={register}
                                descriptionClass="text-red-500 rotate-[-180deg]"
                            />
                            <ComponentItemPriority
                                id="option_2"
                                value={ValuePriority.Medium}
                                paint={watch('priority') === ValuePriority.Medium}
                                error={errors.priority?.type}
                                register={register}
                                descriptionClass="text-yellow-500 rotate-[-180deg]"
                            />
                            <ComponentItemPriority
                                id="option_3"
                                value={ValuePriority.Low}
                                paint={watch('priority') === ValuePriority.Low}
                                error={errors.priority?.type}
                                register={register}
                                descriptionClass="text-green-500"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 items-center my-1">
                        <ComponentLabel title={translate('notes.form.items.featured.title')} htmlFor="featured" errors={errors} />
                        <div className='flex w-full gap-x-2'>
                            <ComponentItemFeatured
                                value={ValueBoolean.YEAH}
                                paint={watch('featured') === ValueBoolean.YEAH}
                                error={errors.featured?.type}
                                register={register}
                            />
                            <ComponentItemFeatured
                                value={ValueBoolean.NOT}
                                paint={watch('featured') === ValueBoolean.NOT}
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
                                    <button onClick={() => removeFile()} type="button" name={translate('notes.form.items.image.button')} title={translate('notes.form.items.image.button')} className="group flex gap-x-1.5 items-center border-[0.1px] bg-custom-gradient border-none px-2 rounded-md">
                                        <ComponentIcon name='image' size={10} descriptionClass="group-hover:text-tertiary text-primary" />
                                        <span className="text-[12.3px] group-hover:text-tertiary text-primary font-semibold tracking-wider transition duration-500">
                                            {translate('notes.form.items.image.button')}
                                        </span>
                                    </button>
                                )
                            }
                        </div>
                        <label htmlFor="file-upload" title={translate('notes.form.items.image.upload.text_1')} className="grid gap-y-0.5 place-items-center mt-0.5 p-1 dark:border-dark-secondary border-secondary border-opacity-20 dark:bg-dark-primary bg-primary w-full rounded-md border-[0.1px] cursor-pointer hover:border-opacity-60 transition duration-500">
                            {
                                ((!file || !noteSelected?.file?.id) && (!viewFile)) ?
                                    <ComponentIcon name="upload-file" size={27} descriptionClass="icon-home dark:text-dark-secondary text-secondary cursor-pointer" />
                                    :
                                    <Image src={viewFile ?? ""} alt="" width={80} height={80} className="max-w-[80px] max-h-[80px] rounded-md" />
                            }
                            <span className='line-clamp-1 dark:text-dark-secondary text-secondary text-md font-normal tracking-wide'>
                                {
                                    (!file || !noteSelected?.file?.id) && (!viewFile) && `${translate('notes.form.items.image.upload.text_2')}...`
                                }
                            </span>
                            <input id="file-upload" accept="image/*" name="file-upload" type="file" onChange={event => captureFile(event)} className="sr-only" />
                        </label>
                    </div>
                </div>
                <div className="flex gap-x-10">
                    <button type="submit" title={translate('notes.form.buttons.create')} name={translate('notes.form.buttons.create')} className="relative flex w-full justify-center rounded-md text-tertiary border-[0.1px] border-none px-3 py-1 text-md font-normal hover:font-semibold bg-custom-gradient tracking-wider outline-none">
                        {translate('notes.form.buttons.create')}
                    </button>
                    <button onClick={() => restart(true)} type="button" name={translate('notes.form.buttons.close')} title={translate('notes.form.buttons.close')} className="relative flex text-tertiary w-full justify-center rounded-md bg-custom-gradient-red px-3 py-1 text-md font-normal hover:font-semibold tracking-wider outline-none">
                        {translate('notes.form.buttons.close')}
                    </button>
                </div>
            </form>
            {response && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} reply={reply} buttonClose={false} />}
            {loading && <ComponentMessageWait open={loading} setOpen={setLoading} />}
        </div >
    )
}