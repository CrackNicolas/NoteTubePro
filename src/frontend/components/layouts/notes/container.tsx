'use client'

import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";

import { Component } from "@/frontend/types/component";

import IContext from "@/context/interfaces/context";
import useAppContext from "@/context/hooks/context";
import useAppTranslation from "@/shared/hooks/translation";

import { PropsNote } from "@/context/types/note";
import { APP_ROUTES } from "@/frontend/constant/app_rutes";
import { ValueBoolean } from "@/frontend/enums/boolean";
import { PropsCategory } from "@/context/types/category";

import { httpRequest } from "@/shared/logic/requests";

import ComponentItems from "@/frontend/components/layouts/category/list/items";
import ComponentHeader from "@/frontend/components/partials/template/dashboard/header";
import ComponentContainerForm from "@/frontend/components/layouts/notes/container_form";

export default function ComponentNotes(): Component {
    const [selectedNote, setSelectedNote] = useState<PropsNote | undefined>(undefined);
    const [listCategorys, setListCategorys] = useState<PropsCategory[]>([]);
    const [categorySelected, setCategorySelected] = useState<PropsCategory | undefined>(undefined);
    
    const lastPage: string = localStorage.getItem('last_page') as string;
    
    const { note, opacity }: IContext = useAppContext();
    const { translate } = useAppTranslation();
    
    const router = useRouter();

    const select = (category: PropsCategory): void => setCategorySelected(category);

    const loadCategorys = useCallback(async (): Promise<void> => {
        const { data } = await httpRequest({ type: 'GET', url: '/api/categorys/true' });

        if (data.status === 200) {
            setListCategorys(data.details);
        }
        if (data.status === 500) {
            setListCategorys([]);
        }
    }, [])

    useEffect(() => {
        if (lastPage === ValueBoolean.NOT) {
            loadCategorys();
        }
    }, [loadCategorys])

    useEffect(() => {
        if (lastPage === ValueBoolean.YEAH) {
            setSelectedNote(note);
            setCategorySelected(note?.category);
            if (!note) {
                router.push(APP_ROUTES.notes.search);
            }
        }
    }, [note]);

    return (
        <article className={`${opacity && 'opacity-50'} flex min-h-screen 2xl:px-0 sm:pl-5 flex-col gap-y-6 justify-start pt-20 mb-10 sm:mb-0`}>
            {
                !categorySelected ?
                    <Fragment>
                        <ComponentHeader title={translate('notes.title')} subtitle={translate('notes.subtitle')} />
                        <ComponentItems categorys={listCategorys} select={select} paint={true} />
                    </Fragment>
                    :
                    <ComponentContainerForm categorySelected={categorySelected} setCategorySelected={setCategorySelected} noteSelected={selectedNote} />
            }
        </article>
    )
}