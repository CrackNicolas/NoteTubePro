'use client'

import { useEffect, useState } from "react"

import { Component } from "@/frontend/types/component";

import { PropsCategory } from "@/context/types/category";
import { PropsResponse } from "@/shared/types/response";

import IContext from "@/context/interfaces/context";
import useAppContext from "@/context/hooks/context";
import useAppTranslation from "@/shared/hooks/translation";

import { httpRequest } from "@/shared/logic/requests";

import ComponentList from "@/frontend/components/layouts/category/list/container";
import ComponentHeader from "@/frontend/components/partials/template/dashboard/header";
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";

export default function ComponentCategory(): Component {
    const { opacity }: IContext = useAppContext();

    const { translate } = useAppTranslation();

    const [listCategorys, setListCategorys] = useState<PropsCategory[]>([]);

    const [open, setOpen] = useState<boolean>(false);
    const [restart, setRestart] = useState<boolean>(false);
    const [response, setResponse] = useState<PropsResponse>();

    const loadCategorys = async (): Promise<void> => {
        const { data } = await httpRequest({ type: 'GET', url: `/api/categorys` });
        
        if (data.status === 200) {
            setListCategorys(data.details);
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
        <article className={`${opacity && 'opacity-50'} relative min-h-screen sm:px-0.5 flex flex-col gap-12 sm:pt-20 pt-16 pb-7`}>
            <ComponentHeader title={translate('categories.title')} subtitle={translate('categories.subtitle')} />
            <ComponentList categorys={listCategorys} setRestart={setRestart} />
            {response && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />}
        </article>
    )
}