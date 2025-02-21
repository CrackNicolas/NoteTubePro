import { useRef, useState } from "react";

import { Component } from "@/frontend/types/component";
import { Languages } from "@/shared/enums/languages";

import IElement from "@/frontend/interfaces/elements/element";
import useMouseDown from "@/frontend/hooks/mousedown";
import useAppTranslation from "@/shared/hooks/translation";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentMotion from "@/frontend/components/partials/motion";

interface IButtonLanguage {
    movePosition: boolean
}

interface IItemPopover extends Pick<IElement, 'onClick'> {
    ruteTranslate: string,
    paint: boolean
}

export default function ComponentButtonLanguage(props: IButtonLanguage): Component {
    const { movePosition } = props;

    const { translate, update_language, language } = useAppTranslation();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const togglePopover = (): void => setIsOpen(!isOpen);

    const refPopoverLanguage = useRef<HTMLDivElement>(null);
    const refButtonPopoverLanguage = useRef<HTMLButtonElement>(null);

    const handleClickOutside = (event: MouseEvent): void => {
        if (
            refPopoverLanguage.current && !refPopoverLanguage.current.contains(event.target as Node) &&
            refButtonPopoverLanguage.current && !refButtonPopoverLanguage.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    }

    useMouseDown({ action: handleClickOutside });

    const itemPopover = ({ ruteTranslate, onClick, paint }: IItemPopover): Component => {
        return (
            <div title={translate(ruteTranslate)} onClick={onClick} className={`${paint && 'dark:bg-custom-gradient bg-custom-gradient-red'} flex justify-between items-center w-full px-3 py-1 transition-all`}>
                <span className={`text-md ${paint? 'text-tertiary':'text-primary'}`}>
                    {translate(ruteTranslate)}
                </span>
                <ComponentIcon size={18} name="translate" descriptionClass={`${paint? 'text-tertiary':'text-primary'}`}/>
            </div>
        )
    }

    return (
        <div className={`${movePosition ? 'absolute right-12' : 'relative'} flex items-center`}>
            <button ref={refButtonPopoverLanguage} title={translate('menu.top.buttons.translate.title')} onClick={() => togglePopover()} className={`px-3 py-1 ${!movePosition && 'mr-3'} rounded-md dark:bg-custom-gradient bg-custom-gradient-red cursor-pointer`}>
                <ComponentIcon size={20} name="translate" descriptionClass="text-tertiary cursor-pointer" />
            </button>
            {isOpen && (
                <div ref={refPopoverLanguage}>
                    <ComponentMotion type="popover" descriptionClass="absolute top-6 right-5 mt-3 w-40 bg-tertiary border rounded-md shadow-lg overflow-hidden">
                        {itemPopover({
                            ruteTranslate: 'menu.top.buttons.translate.options.spanish',
                            onClick: () => update_language(Languages.SPANISH),
                            paint: (language === Languages.SPANISH)
                        })}
                        {itemPopover({
                            ruteTranslate: 'menu.top.buttons.translate.options.english',
                            onClick: () => update_language(Languages.ENGLISH),
                            paint: (language === Languages.ENGLISH)
                        })}
                    </ComponentMotion>
                </div>
            )}
        </div>
    )
}