const upperCaseFirstLetter = (text: string): string => {
    return `${text.substring(0, 1).toUpperCase()}${text.substring(1)}`;
}

const pascalCase = (text: string, separator: string = '-'): string => {
    const words = text.split(separator);
    return words.reduce((acc: string, word: string) => `${acc} ${upperCaseFirstLetter(word)}` , '').trim();
}

const kebabCase = (text: string, separator: string = ' '): string => {
    const words = text.split(separator);
    return words.reduce((acc: string, word: string) => `${acc === '' ? '' : acc + '-'}${word.toLowerCase()}` , '').trim()
}

export {
    kebabCase,
    pascalCase,
    upperCaseFirstLetter
};
