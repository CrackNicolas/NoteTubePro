'use client'

import { useSearchParams } from "next/navigation";

import { Fragment, useCallback, useEffect, useState } from "react";

import ComponentItems from "@/frontend/components/layouts/category/list/items";
import ComponentHeader from "@/frontend/components/partials/template/dashboard/header";
import ComponentContainerForm from "@/frontend/components/layouts/notes/container_form";

import { Request } from "@/backend/logic/requests";
import { Props_note } from "@/context/types/note";
import { Props_category } from "@/context/types/category";

export default function ComponentNotes(): JSX.Element {
    const [selected_note, setSelected_note] = useState<Props_note | undefined>(undefined);
    const [list_categorys, setList_categorys] = useState<Props_category[]>([]);
    const [category_selected, setCategory_selected] = useState<Props_category | undefined>(undefined);

    const search_params = useSearchParams();

    const select = (category: Props_category): void => setCategory_selected(category);

    const load_categorys = useCallback(async (): Promise<void> => {
        const { data } = await Request('GET',`/api/categorys/true`);

        if (data.status === 200) {
            setList_categorys(data.data);
        }
        if (data.status === 500) {
            setList_categorys([]);
        }
    }, [])

    useEffect(() => {
        load_categorys();
    }, [load_categorys])

    useEffect(() => {
        if (search_params.get('data') !== null) {
            const { note } = JSON.parse(search_params.get('data') as string);
            setSelected_note(note);
            setCategory_selected(note.category);
        }
    }, [search_params]);

    return (
        <article className="flex h-screen flex-col gap-y-6 justify-start pt-20">
            {
                !category_selected ?
                    <Fragment>
                        <ComponentHeader title="Elige una categoría" subtitle="Selecciona una categoría para tu nota" />
                        <ComponentItems categorys={list_categorys} select={select} use_paint={true} />
                    </Fragment>
                    :
                    <ComponentContainerForm category_selected={category_selected} setCategory_selected={setCategory_selected} note_selected={selected_note} />
            }
        </article>
    )
}