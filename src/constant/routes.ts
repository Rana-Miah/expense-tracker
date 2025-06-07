export const AUTH_ROUTES= ['/auth/login','/auth/register','/auth/reset-password']
export const PUBLIC_ROUTES = ['/','/public-route',]
export const REDIRECT_TO = {
    HOME:'/',
    DASHBOARD:"/dashboard",
    LOGIN_PAGE:'/auth/login',
    REGISTER_PAGE:'/auth/register',
} as const


export const appRoute = {
    HOME:'/',
    DASHBOARD:"/dashboard",
    PUBLIC:'/public-route',
    NOT_PUBLIC:"/not-public-route",
    FAMILY:'/family-dynamic-page-1',
    MEMBER:'/family-dynamic-page-1/member/member-dynamic-page-1',
    LOGIN_PAGE:'/auth/login',
    REGISTER_PAGE:'/auth/register',
} as const


type AppRoute = typeof appRoute[keyof typeof appRoute]
type AppRouteKey = keyof typeof appRoute
