import { Component } from "@/frontend/types/component";
import { ValueBoolean } from "@/frontend/enums/boolean";

import IModalBase from "@/frontend/interfaces/modal";

import useAppTranslation from "@/shared/hooks/translation";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentModal from "@/frontend/components/partials/modal";

interface IMessageConfirmationDelete extends IModalBase {
    action: () => Promise<void>
}

export default function ComponentMessageConfirmationDelete(props: IMessageConfirmationDelete): Component {
    const { open, setOpen, action } = props;

    const { translate } = useAppTranslation();

    const translateName = (value: ValueBoolean): string => translate(`messages.confirmation.options.${value.toLocaleLowerCase()}`)

    return (
        <ComponentModal open={open} setOpen={setOpen}>
            <div className="flex flex-col w-full items-center text-center sm:mt-0 sm:text-left">
                <span className="flex place-items-center p-3.5 rounded-full dark:bg-dark-secondary bg-primary">
                    <ComponentIcon name='delete-note' descriptionClass='text-error' size={24} />
                </span>
                <p title={translate('messages.confirmation.title')} className="mt-2 text-center text-xl text-gradient">
                    {translate('messages.confirmation.title')}
                </p>
            </div>
            <div className="flex gap-x-2 sm:gap-x-5">
                <button type="button" title={translateName(ValueBoolean.YEAH)} onClick={() => action()} className="relative outline-none rounded-full w-[135px] sm:w-[200px] bg-custom-gradient hover:opacity-100 dark:opacity-100 opacity-70 cursor-pointer text-tertiary">
                    {translateName(ValueBoolean.YEAH)}
                </button>
                <button type="button" title={translateName(ValueBoolean.NOT)} onClick={() => setOpen(false)} className="relative outline-none rounded-full w-[135px] sm:w-[200px] bg-custom-gradient-red hover:opacity-100 dark:opacity-100 opacity-70 cursor-pointer text-tertiary">
                    {translateName(ValueBoolean.NOT)}
                </button>
            </div>
        </ComponentModal>
    )
}