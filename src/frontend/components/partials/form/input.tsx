import { ChangeEvent } from "react";

import { Component } from "@/frontend/types/component";
import { validation } from "@/frontend/validations/form";
import { IErrorInput } from "@/frontend/interfaces/elements/form/error";

import IInputBase from "@/frontend/interfaces/elements/form/input";

interface IInput extends IInputBase, IErrorInput { }

export default function ComponentInput(props: IInput): Component {
    const { type, name, id = name, placeholder, descriptionClass, value, rows, error, register, required = true } = props;

    const additionalValidation = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        event.target.value = event.target.value
            .replace(/[\r\n-]+/g, "")                                // Elimina saltos de línea
            .replace(/\s\s+/g, " ")                                  // Reduce múltiples espacios a uno
            .replace(/\.{2,}/g, ".")                                 // Reduce múltiples puntos a uno
            .replace(/,{2,}/g, ",")                                  // Reduce múltiples comas a una
            .replace(/_{2,}/g, "_")                                  // Reduce múltiples guiones bajos a uno
            .replace(/\b\w{23,}\b/g, (match) => match.slice(0, 22)); // Limita palabras a 9 caracteres
    }

    const propsInput: object = {
        ...register(name, validation(name, required)),
        id,
        type,
        name,
        value,
        className: ` ${(!error) ? 'dark:border-dark-secondary border-secondary dark:text-dark-secondary text-secondary dark:placeholder:text-dark-secondary placeholder:text-secondary' : 'dark:border-dark-error border-error dark:text-dark-error text-error dark:placeholder:text-dark-error placeholder:text-error'} ${descriptionClass}`,
        placeholder
    };

    return (
        (!rows) ?
            (type == "radio") ?
                <input {...propsInput} />
                :
                <input
                    {...propsInput}
                    onChange={(type != "radio") ? (event) => additionalValidation(event) : undefined}
                />
            :
            <textarea
                {...register(name, validation(name))}
                id={id}
                name={name}
                rows={rows}
                onChange={(event) => additionalValidation(event)}
                className={` ${(!error) ? 'dark:border-dark-secondary border-secondary dark:text-dark-secondary text-secondary dark:placeholder:text-dark-secondary placeholder:text-secondary' : 'dark:border-dark-error border-error dark:text-dark-error text-error dark:placeholder:text-dark-error placeholder:text-error'} ${descriptionClass}`}
                placeholder={placeholder}
            />
    )
}