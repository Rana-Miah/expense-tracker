import { SendResponse } from "@/interface"

export function successResponse<T>(message: string, data: T): SendResponse<T, never> {
  return {
    success: true,
    message,
    data,
    error: null
  }
}

export function failureResponse<E extends Error>(
  message: string,
  error: E | null = null
): SendResponse<null, E> {
  return {
    success: false,
    message,
    data: null,
    error
  }
}