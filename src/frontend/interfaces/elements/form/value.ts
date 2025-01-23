import { FieldValues, UseFormSetValue } from "react-hook-form";

export default interface ISetValue {
    setValue?: UseFormSetValue<FieldValues>,
}