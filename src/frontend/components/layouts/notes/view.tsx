import { Dispatch, SetStateAction } from "react";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentModal from "@/frontend/components/partials/modal";

import { Props_note } from "@/context/types/note";

import { Time_elapsed } from "@/frontend/logic/format_time";

type Props = {
    open: boolean,
    note: Props_note,
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function ComponentView(props: Props): JSX.Element {
    const { open, setOpen, note } = props;

    return (
        <ComponentModal open={open} setOpen={setOpen}>
            <div className="flex flex-col w-full items-center sm:mt-0 sm:text-left pt-1">
                <span title="Fecha de creacion" className="absolute top-[5px] dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-30 text-[12px]">
                    {Time_elapsed(note.createdAt)}
                </span>
                <div className="flex justify-between items-center w-full">
                    <h3 className="text-start line-clamp-1 font-normal tracking-wide dark:text-dark-secondary text-secondary font-semibold text-lg" title={note.title} >
                        {note.title}
                    </h3>
                    <span className="rounded-full" title={`Categoria ${note.category.title.toLowerCase()}`}>
                        <ComponentIcon name={note.category.icon} size={20} description_class="dark:text-dark-secondary text-secondary" />
                    </span>
                </div>
                <p className="text-start text-sm dark:text-dark-secondary text-gray-500 w-full mb-7" title={note.description}>
                    {note.description}
                </p>
                <div className="flex justify-between items-center w-full">
                    {
                        (note.file) && (
                            <a href={`/api/images/${note.file.url.split("/").pop()}`} target="_blank" title="Ver imagen" rel="noopener noreferrer" className="group cursor-pointer dark:hover:bg-dark-secondary hover:bg-secondary flex items-center outline-none gap-x-1.5 border-[0.1px] dark:border-dark-secondary border-secondary rounded-md px-1.5">
                                <ComponentIcon name="upload-file-selected" size={13} description_class="dark:text-dark-secondary text-secondary dark:group-hover:text-dark-primary group-hover:text-primary" />
                                <span className="dark:text-dark-secondary text-secondary dark:group-hover:text-dark-primary group-hover:text-primary">
                                    Ver imagen
                                </span>
                            </a>
                        )
                    }
                    <div className="flex gap-x-2 items-center">
                        <span className="rounded-full" title={`Prioridad ${note.priority}`}>
                            <ComponentIcon name="arrow" size={21} description_class={`text-${(note.priority === 'Alta') ? 'red' : (note.priority === 'Media') ? 'yellow' : 'green'}-500 ${(note.priority !== 'Baja') && 'rotate-[-180deg]'}`} />
                        </span>
                        <span className="rounded-full" title={`Nota ${(note.featured ? 'destacada' : 'no destacada')}`}>
                            <ComponentIcon name={`star-${note.featured ? 'fill' : 'half'}`} size={19} description_class="dark:text-dark-secondary text-secondary" />
                        </span>
                    </div>
                </div>
            </div>
        </ComponentModal>
    )
}