import { Component } from "@/frontend/types/component";

import useAppTranslation from "@/shared/hooks/translation";

import IModalBase from "@/frontend/interfaces/modal";
import ComponentModal from "@/frontend/components/partials/modal";

export default function ComponentMessageWait(props: IModalBase): Component {
    const { open, setOpen } = props;

    const { translate } = useAppTranslation();

    return (
        <ComponentModal open={open} setOpen={setOpen}>
            <div className="flex flex-col items-center gap-y-5 px-3 sm:px-7 py-7">
                <p title={`${translate('messages.wait')}...`} className="mt-2 text-center text-xl text-gradient font-semibold dark:opacity-100 opacity-50">
                    {`${translate('messages.wait')}...`}
                </p>
                <div className="mt-1 flex gap-x-4 place-items-center justify-center">
                    <div className="w-3 h-3 dark:bg-seventh opacity-60 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 dark:bg-seventh opacity-60 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    <div className="w-3 h-3 dark:bg-seventh opacity-60 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
                </div>
            </div>
        </ComponentModal>
    )
}