import { REGEX_PATTERNS } from "@/frontend/constant/regex";

import { PropsInputName } from "@/frontend/interfaces/elements/form/input";

type PropsValidation = {
    required?: {
        value: boolean,
        message: string
    };
    minLength?: {
        value: number,
        message: string
    };
    maxLength?: {
        value: number,
        message: string
    },
    pattern?: {
        value: RegExp,
        message: string
    }
}

export const validation = (name: PropsInputName, required: boolean = true): PropsValidation => {
    switch (name) {
        case 'title':
            return {
                required: {
                    value: required,
                    message: 'Titulo requerido'
                },
                minLength: {
                    value: 5,
                    message: 'El titulo deber ser mayor a 5 caracteres'
                },
                maxLength: {
                    value: 45,
                    message: 'El titulo deber ser menor a 45 caracteres'
                },
                pattern: {
                    value: REGEX_PATTERNS.title,
                    message: 'Solo caracteres válidos, sin dobles espacios'
                }
            }
        case 'description':
            return {
                required: {
                    value: required,
                    message: 'Descripcion requerida'
                },
                minLength: {
                    value: 15,
                    message: 'La descripcion deber ser mayor a 15 caracteres'
                },
                maxLength: {
                    value: 500,
                    message: 'La descripcion deber ser menor a 500 caracteres'
                },
                pattern: {
                    value: REGEX_PATTERNS.description,
                    message: 'Solo caracteres válidos, sin dobles espacios'
                }
            }
        case "priority":
            return {
                required: {
                    value: required,
                    message: 'Prioridad requerida'
                }
            }
        case 'featured':
            return {
                required: {
                    value: required,
                    message: 'Selecciona una opcion'
                }
            }
    }
    return {};
}