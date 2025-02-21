import { Component } from "@/frontend/types/component";

import IModalBase from "@/frontend/interfaces/modal";
import useAppTranslation from "@/shared/hooks/translation";

import { PropsResponse, HttpStatusCode } from "@/shared/types/response";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentModal from "@/frontend/components/partials/modal";

interface IMessageConfirmation extends IModalBase {
    reply?: () => void,
    response: PropsResponse,
    buttonClose?: boolean
}

export default function ComponentMessageConfirmation(props: IMessageConfirmation): Component {
    const { open, setOpen, response: { status, info }, reply = () => { setOpen(false) }, buttonClose = true } = props;

    const { translate } = useAppTranslation();

    const icon = (status: HttpStatusCode): Component => {
        switch (status) {
            case 200: case 201: case 204:
                return <ComponentIcon name='check' descriptionClass='text-secondary' size={25} />
            case 400: case 401: case 403: case 404: case 500:
                return <ComponentIcon name='close' descriptionClass='text-error' size={25} />
        }
    }

    const color = (status: HttpStatusCode): string => {
        switch (status) {
            case 200: case 201: case 204:
                return "gradient";
            case 400: case 401: case 403: case 404: case 500:
                return "error";
        }
    }

    return (
        <ComponentModal open={open} setOpen={setOpen} color={(color(status) === 'gradient') ? 'secondary' : 'error'} buttonClose={buttonClose} >
            <div className="flex flex-col w-full items-center text-center sm:mt-0 sm:text-left">
                <span className={`flex place-items-center p-2.5 rounded-full bg-gray-900 ${!buttonClose && 'mt-4'}`}>
                    {icon(status)}
                </span>
                <p className={`mt-2 text-center text-xl text-${color(status)}`}>
                    {translate(`messages.entity.${info?.message}`)}
                </p>
            </div>
            <button type="button" name={translate('messages.exito.button')} onClick={() => reply()} className={`outline-none rounded-full w-[200px] ${(color(status) == 'error') ? 'bg-custom-gradient-red' : 'bg-custom-gradient'} dark:hover:bg-dark-${color(status)} text-tertiary hover:opacity-100 dark:opacity-100 opacity-70 cursor-pointer `}>
                {translate('messages.exito.button')}
            </button>
        </ComponentModal>
    )
}