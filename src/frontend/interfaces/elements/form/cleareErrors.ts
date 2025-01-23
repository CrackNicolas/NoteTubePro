import { FieldValues, UseFormClearErrors } from "react-hook-form";

export default interface IClearError {
    clearErrors?: UseFormClearErrors<FieldValues>
}