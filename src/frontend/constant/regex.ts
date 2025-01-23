type PropsRegex = {
    title: RegExp,
    description: RegExp
}

export const REGEX_PATTERNS: PropsRegex = {
    title: /^[A-Za-z._áéíóúñ0-9]+(?: [A-Za-z._áéíóúñ0-9]+)* ?$/i,
    description: /^[A-Za-z,._áéíóúñ0-9]+(?: [A-Za-z,._áéíóúñ0-9]+)* ?$/i
}

export const validateRegex = (type: keyof PropsRegex, value: string): boolean => {
    return REGEX_PATTERNS[type]?.test(value) || false;
};