import { Languages } from "@/shared/enums/languages";

export default interface ITranslation {
    language: Languages,
    translate: (chain: string) => string,
    update_language: (language: Languages) => void
}