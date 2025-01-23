import { PropsError, PropsErrorBase } from "@/frontend/types/form/error";
import { LiteralUnion, FieldErrors, FieldValues } from "react-hook-form";

export interface IErrorInput {
    error?: PropsError | LiteralUnion<"required" | "pattern" | "maxLength" | "minLength", string> | undefined
}

export interface IErrorBase {
    error?: PropsErrorBase
}

export interface IErrorLabel {
    errors?: FieldErrors<FieldValues>
}