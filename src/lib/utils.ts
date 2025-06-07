import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isInclude = <T extends string>(arr: T[], value: string) => (arr.some(
  str => str.toLowerCase() === value.toLowerCase()
)
)
