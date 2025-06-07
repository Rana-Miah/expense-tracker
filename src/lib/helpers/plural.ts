type PluralizeOptions = {
    plural?: string;
    withCount?: boolean;
}
export const pluralize = (count: number, singular: string, options?: PluralizeOptions): string => {
    const word = count === 0 ? `No ${singular.toLocaleLowerCase()} yet! ` : count === 1 ? singular : options?.plural ?? `${singular}s`
    // return count > 0
    //     ? options?.withCount
    //         ?
    //         `${count} ${word}`
    //         : word
    //     : word
    return count > 0&& options?.withCount
            ?
            `${count} ${word}`
            : word
}