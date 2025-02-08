export default interface ITranslation {
    language: string,
    translate: (chain: string) => string,
    update_language: (language: string) => void
}