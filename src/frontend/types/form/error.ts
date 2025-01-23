import { FieldError, FieldErrorsImpl, LiteralUnion, Merge } from "react-hook-form"

export type PropsError = FieldError | Merge<FieldError, FieldErrorsImpl<any>>
export type PropsErrorBase = PropsError | LiteralUnion<"required", string> | undefined