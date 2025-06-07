import { TOKEN_KEY } from "@/constant/token-constant";

export type  TokenKey=  typeof TOKEN_KEY[(keyof typeof TOKEN_KEY)]
