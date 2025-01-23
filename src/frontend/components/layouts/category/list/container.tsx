import { useRouter } from "next/navigation";
import { useState } from "react";

import { Component } from "@/frontend/types/component";
import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import { PropsCategory } from "@/context/types/category"
import { PropsResponse } from "@/context/types/response";
import { PropsDispatchBoolean } from "@/frontend/types/dispatch";

import { httpRequest } from "@/backend/logic/requests";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentItems from "@/frontend/components/layouts/category/list/items";
import ComponentMessageWait from '@/frontend/components/layouts/messages/wait';
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";

interface IList {
    categorys: PropsCategory[],
    setRestart: PropsDispatchBoolean
}

export default function ComponentList(props: IList): Component {
    const { categorys, setRestart } = props;

    const router = useRouter();

    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<PropsResponse>();

    const select = async (category: PropsCategory): Promise<void> => {
        setLoading(true);

        const { data } = await httpRequest({
            type: 'PUT',
            url: '/api/categorys',
            body: {
                title: category.title,
                use: !category.use
            }
        });

        setLoading(false);
        setResponse(data);
        setOpen(true);
        setRestart(true);
    }

    return (
        <article className="relative mt-8 ">
            <span className="absolute left-0 top-[-40px] dark:bg-dark-primary bg-primary rounded-full p-1.5 dark:hover:bg-dark-room hover:bg-room transition duration-500" title="Volver atras" onClick={() => router.push(APP_ROUTES.dashboard.config)}>
                <ComponentIcon name="return" size={22} descriptionClass="rotate-[-180deg] dark:text-dark-secondary text-secondary cursor-pointer" />
            </span>
            <ComponentItems categorys={categorys} select={select} />
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
            {
                (loading) && <ComponentMessageWait open={loading} setOpen={setLoading} />
            }
        </article>
    )
}