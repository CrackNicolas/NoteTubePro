'use client'

import { Fragment, useCallback, useEffect, useState } from "react";

import { Component } from "@/frontend/types/component";

import IContext from "@/context/interfaces/context";
import useAppContext from "@/context/hooks/context";

import { PropsNote } from "@/context/types/note";
import { PropsCategory } from "@/context/types/category";

import { httpRequest } from "@/backend/logic/requests";

import ComponentItems from "@/frontend/components/layouts/category/list/items";
import ComponentHeader from "@/frontend/components/partials/template/dashboard/header";
import ComponentContainerForm from "@/frontend/components/layouts/notes/container_form";

export default function ComponentNotes(): Component {
    const [selectedNote, setSelectedNote] = useState<PropsNote | undefined>(undefined);
    const [listCategorys, setListCategorys] = useState<PropsCategory[]>([]);
    const [categorySelected, setCategorySelected] = useState<PropsCategory | undefined>(undefined);

    const { note }: IContext = useAppContext();

    const select = (category: PropsCategory): void => setCategorySelected(category);

    const loadCategorys = useCallback(async (): Promise<void> => {
        const { data } = await httpRequest({ type: 'GET', url: '/api/categorys/true' });

        if (data.status === 200) {
            setListCategorys(data.data);
        }
        if (data.status === 500) {
            setListCategorys([]);
        }
    }, [])

    useEffect(() => {
        loadCategorys();
    }, [loadCategorys])

    useEffect(() => {
        setSelectedNote(note);
        setCategorySelected(note?.category);
    }, [note]);

    return (
        <article className="flex h-screen 2xl:px-0 xl:px-1 sm:pl-3 flex-col gap-y-6 justify-start pt-20">
            {
                !categorySelected ?
                    <Fragment>
                        <ComponentHeader title="Elige una categoría" subtitle="Selecciona una categoría para tu nota" />
                        <ComponentItems categorys={listCategorys} select={select} paint={true} />
                    </Fragment>
                    :
                    <ComponentContainerForm categorySelected={categorySelected} setCategorySelected={setCategorySelected} noteSelected={selectedNote} />
            }
        </article>
    )
}