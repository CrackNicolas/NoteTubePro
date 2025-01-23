import { Component } from "@/frontend/types/component";

import IModalBase from "@/frontend/interfaces/modal";

import { PropsResponse, PropsStatus } from "@/context/types/response";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentModal from "@/frontend/components/partials/modal";

interface IMessageConfirmation extends IModalBase {
    reply?: () => void,
    response: PropsResponse,
    buttonClose?: boolean
}

export default function ComponentMessageConfirmation(props: IMessageConfirmation): Component {
    const { open, setOpen, response: { status, info }, reply = () => { setOpen(false) }, buttonClose = true } = props;

    const icon = (status: PropsStatus): Component => {
        switch (status) {
            case 200: case 201: case 204:
                return <ComponentIcon name='check' descriptionClass='text-secondary' size={25} />
            case 400: case 401: case 403: case 404: case 500:
                return <ComponentIcon name='close' descriptionClass='text-error' size={25} />
        }
    }

    const color = (status: PropsStatus): string => {
        switch (status) {
            case 200: case 201: case 204:
                return "secondary";
            case 400: case 401: case 403: case 404: case 500:
                return "error";
        }
    }

    return (
        <ComponentModal open={open} setOpen={setOpen} color={color(status)} buttonClose={buttonClose} >
            <div className="flex flex-col w-full items-center text-center sm:mt-0 sm:text-left">
                <span className={`flex place-items-center p-2.5 rounded-full bg-gray-900 ${!buttonClose && 'mt-4'}`}>
                    {
                        icon(status)
                    }
                </span>
                <p className="mt-2 text-center text-xl dark:text-dark-tertiary text-tertiary opacity-50 dark:opacity-100">
                    {info?.message}
                </p>
            </div>
            <button type="button" name="Aceptar" onClick={() => reply()} className={`outline-none rounded-full w-[200px] dark:bg-dark-primary bg-primary dark:hover:bg-dark-${color(status)} dark:hover:border-transparent dark:hover:text-dark-primary hover:opacity-100  dark:opacity-100 opacity-70 cursor-pointer dark:text-dark-${color(status)} text-${color(status)} border-[0.1px] dark:border-dark-${color(status)} border-${color(status)} `}>
                Aceptar
            </button>
        </ComponentModal>
    )
}