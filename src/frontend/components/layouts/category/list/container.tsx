import { useRouter } from "next/navigation";

import { Dispatch, SetStateAction, useState } from "react";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentItems from "@/frontend/components/layouts/category/list/items";
import ComponentMessageWait from '@/frontend/components/layouts/messages/wait';
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";

import { Request } from "@/backend/logic/requests";
import { Props_category } from "@/context/types/category"
import { Props_response } from "@/context/types/response";

type Props = {
    categorys: Props_category[],
    setRestart: Dispatch<SetStateAction<boolean>>
}

export default function ComponentList(props: Props): JSX.Element {
    const { categorys, setRestart } = props;

    const router = useRouter();

    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<Props_response>();

    const select = async (category: Props_category): Promise<void> => {
        setLoading(true);

        const { data } = await Request('PUT','/api/categorys', {
            title: category.title,
            use: !category.use
        });

        setLoading(false);
        setResponse(data);
        setOpen(true);
        setRestart(true);
    }

    return (
        <article className="relative">
            <span className="absolute left-0 top-[-40px] dark:bg-dark-primary bg-primary rounded-full p-1.5 dark:hover:bg-dark-room hover:bg-room transition duration-500" title="Volver atras" onClick={() => router.push('/dashboard/config')}>
                <ComponentIcon name="return" size={22} description_class="rotate-[-180deg] dark:text-dark-secondary text-secondary cursor-pointer" />
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