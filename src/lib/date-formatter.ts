import { DateArg, format, FormatOptions,formatDistanceToNow } from 'date-fns'
export const dateFormatter = (date: DateArg<Date> & {}, formatStr?: string, options?: FormatOptions) => {
    if(!formatStr) return formatDistanceToNow(date,{addSuffix:true})
    
    return format(date, formatStr||'dd MMMM, yyyy', options)
}