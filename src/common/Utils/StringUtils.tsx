const upperCaseFirstLetter = (text: string): string => {
    return `${text.substring(0, 1).toUpperCase()}${text.substring(1)}`;
}

export {
    upperCaseFirstLetter
};
