import { TypeErrorForm } from "@/frontend/enums/form/errors/name";
import { PropsError, PropsErrorBase } from "@/frontend/types/form/error";
import { LiteralUnion, FieldErrors, FieldValues } from "react-hook-form";

export interface IErrorInput {
    error?: PropsError | LiteralUnion<TypeErrorForm.REQUIRED | TypeErrorForm.PATTERN | TypeErrorForm.MAX_LENGTH | TypeErrorForm.MIN_LENGTH, string> | undefined
}

export interface IErrorBase {
    error?: PropsErrorBase
}

export interface IErrorLabel {
    errors?: FieldErrors<FieldValues>
}