import { Dispatch, SetStateAction } from "react";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentModal from "@/frontend/components/partials/modal";

type Props = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    action: () => Promise<void>
}

export default function ComponentMessageConfirmationDelete(props: Props): JSX.Element {
    const { open, setOpen, action } = props;

    return (
        <ComponentModal open={open} setOpen={setOpen}>
            <div className="flex flex-col w-full items-center text-center sm:mt-0 sm:text-left">
                <span className="flex place-items-center p-3.5 rounded-full dark:bg-dark-secondary bg-primary">
                    <ComponentIcon name='delete-note' description_class='text-error' size={24} />
                </span>
                <p title="¿Seguro que desea eliminar?" className="mt-2 text-center text-xl dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-50">
                    ¿Seguro que deseas eliminar?
                </p>
            </div>
            <div className="flex gap-x-2 sm:gap-x-5">
                <button type="button" title="SI" onClick={() => action()} className='relative outline-none rounded-full w-[135px] sm:w-[200px] dark:bg-dark-primary bg-primary hover:opacity-100 dark:opacity-100 opacity-70 cursor-pointer dark:text-dark-secondary text-secondary border-[0.1px] dark:border-dark-secondary border-secondary'>
                    SI
                </button>
                <button type="button" title="NO" onClick={() => setOpen(false)} className='relative outline-none rounded-full w-[135px] sm:w-[200px] dark:bg-dark-primary bg-primary hover:opacity-100 dark:opacity-100 opacity-70 cursor-pointer dark:text-dark-error text-error border-[0.1px] dark:border-dark-error border-error'>
                    NO
                </button>
            </div>
        </ComponentModal>
    )
}