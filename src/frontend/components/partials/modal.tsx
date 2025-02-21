import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react';

import { Component } from '@/frontend/types/component';

import ILayouts from '@/frontend/interfaces/layouts';
import IModalBase from '@/frontend/interfaces/modal';
import useAppTranslation from '@/shared/hooks/translation';

import ComponentIcon from "@/frontend/components/partials/icon";

interface IModal extends IModalBase, ILayouts {
    color?: string,
    buttonClose?: boolean
}

export default function ComponentModal(props: IModal): Component {
    const { children, open, setOpen, color = "secondary", buttonClose = true } = props;

    const { translate } = useAppTranslation();

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setOpen}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-sixth transition-opacity" />
                </Transition.Child>
                <div title="modal" className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg dark:bg-dark-primary bg-primary shadow-xl transition-all sm:my-8 w-full max-w-lg">
                                <div className={`relative flex flex-col items-center border-none rounded-lg gap-y-5 px-3 sm:px-5 pb-6 pt-3`}>
                                    <ComponentIcon name='logo' descriptionClass={`absolute top-1.5 left-2 dark:text-dark-${color} text-${color} dark:opacity-100 opacity-70 `} size={20} />
                                    {
                                        buttonClose && (
                                            <button type='button' title={translate('messages.modal.button')} onClick={() => setOpen(false)} className="outline-none" >
                                                <ComponentIcon name='close' descriptionClass={`absolute top-0 right-0 dark:text-dark-${color} text-${color} dark:opacity-100 opacity-70 cursor-pointer`} size={30} />
                                            </button>
                                        )
                                    }
                                    {children}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}