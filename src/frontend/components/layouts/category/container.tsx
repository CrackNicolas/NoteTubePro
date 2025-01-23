'use client'

import { useEffect, useState } from "react"

import { Component } from "@/frontend/types/component";

import { PropsCategory } from "@/context/types/category";
import { PropsResponse } from "@/context/types/response";

import { httpRequest } from "@/backend/logic/requests";

import ComponentList from "@/frontend/components/layouts/category/list/container";
import ComponentHeader from "@/frontend/components/partials/template/dashboard/header";
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";

export default function ComponentCategory(): Component {
    const [listCategorys, setListCategorys] = useState<PropsCategory[]>([]);

    const [open, setOpen] = useState<boolean>(false);
    const [restart, setRestart] = useState<boolean>(false);
    const [response, setResponse] = useState<PropsResponse>();

    const loadCategorys = async (): Promise<void> => {
        const { data } = await httpRequest({ type: 'GET', url: `/api/categorys` });

        if (data.status === 200) {
            setListCategorys(data.data);
        }
        if (data.status === 500) {
            setOpen(true);
            setResponse(data);
            setListCategorys([]);
        }
        setRestart(false);
    }

    useEffect(() => {
        loadCategorys();
    }, [restart])

    return (
        <article className="relative h-screen 2xl:px-0 xl:px-1 sm:pl-3 flex flex-col gap-12 sm:pt-20 pt-16 pb-7">
            <ComponentHeader title="Tus Categorías" subtitle="Toca para agregar o quitar categorías de tus notas" />
            <ComponentList categorys={listCategorys} setRestart={setRestart} />
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
        </article>
    )
}