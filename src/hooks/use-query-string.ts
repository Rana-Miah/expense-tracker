
import { useRouter, useSearchParams } from "next/navigation"
import qs from 'query-string'


export const useQueryString = () => {
    const router = useRouter()
    const rowSearchParams = useSearchParams()
    const stringifyRowSearchParams = rowSearchParams.toString()
    const parsedSearchParams = qs.parse(stringifyRowSearchParams)

    const searchQuery = { ...parsedSearchParams }

    const setQueryParams = (key: string, value: string | (string | null)[] | null, removeKeyOfValues: string[] = []) => {

        if (parsedSearchParams[key] || removeKeyOfValues.includes(value as string)) {
            searchQuery[key] = null
        } else {
            searchQuery[key] = value
        }
        const stringifyParams = qs.stringifyUrl({ url: window.location.href, query: searchQuery }, { skipNull: true })
        router.push(stringifyParams)
    }

    return {rowSearchParams,setQueryParams}
}