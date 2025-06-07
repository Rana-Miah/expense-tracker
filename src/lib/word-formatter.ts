import { NotEmptyStr, Replace } from "@/interface";

export function formatLabel<T extends string>(input: T):Capitalize<Replace<NotEmptyStr<T>>>{
 if (input.includes('-') || input.includes('_')) {
     return (input
      .replace(/[-_]+/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')) as Capitalize<Replace<NotEmptyStr<T>>>

    }
    
    return (input.charAt(0).toUpperCase() + input.slice(1)) as Capitalize<Replace<NotEmptyStr<T>>>
    
}
