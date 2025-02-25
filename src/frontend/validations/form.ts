import { REGEX_PATTERNS } from "@/frontend/constant/regex";

import { TypeErrorForm } from "@/frontend/enums/form/errors/name";

import { PropsInputName } from "@/frontend/interfaces/elements/form/input";

type PropsValidation = {
    [TypeErrorForm.REQUIRED]?: {
        value: boolean,
        message: string
    },
    [TypeErrorForm.MIN_LENGTH]?: {
        value: number,
        message: string
    },
    [TypeErrorForm.MAX_LENGTH]?: {
        value: number,
        message: string
    },
    [TypeErrorForm.PATTERN]?: {
        value: RegExp,
        message: string
    }
}

export const validation = (name: PropsInputName, required: boolean = true): PropsValidation => {
    const ruteTranslate = (error: TypeErrorForm) => `notes.form.items.${name}.messages.${error}`

    switch (name) {
        case 'title':
            return {
                [TypeErrorForm.REQUIRED]: {
                    value: required,
                    message: ruteTranslate(TypeErrorForm.REQUIRED)
                },
                [TypeErrorForm.MIN_LENGTH]: {
                    value: 5,
                    message: ruteTranslate(TypeErrorForm.MIN_LENGTH)
                },
                [TypeErrorForm.MAX_LENGTH]: {
                    value: 45,
                    message: ruteTranslate(TypeErrorForm.MAX_LENGTH)
                },
                [TypeErrorForm.PATTERN]: {
                    value: REGEX_PATTERNS.title,
                    message: ruteTranslate(TypeErrorForm.PATTERN)
                }
            }
        case 'description':
            return {
                [TypeErrorForm.REQUIRED]: {
                    value: required,
                    message: ruteTranslate(TypeErrorForm.REQUIRED)
                },
                [TypeErrorForm.MIN_LENGTH]: {
                    value: 15,
                    message: ruteTranslate(TypeErrorForm.MIN_LENGTH)
                },
                [TypeErrorForm.MAX_LENGTH]: {
                    value: 700,
                    message: ruteTranslate(TypeErrorForm.MAX_LENGTH)
                },
                [TypeErrorForm.PATTERN]: {
                    value: REGEX_PATTERNS.description,
                    message: ruteTranslate(TypeErrorForm.PATTERN)
                }
            }
        case "priority":
            return {
                [TypeErrorForm.REQUIRED]: {
                    value: required,
                    message: ruteTranslate(TypeErrorForm.REQUIRED)
                }
            }
        case 'featured':
            return {
                [TypeErrorForm.REQUIRED]: {
                    value: required,
                    message: ruteTranslate(TypeErrorForm.REQUIRED)
                }
            }
    }
    return {};
}