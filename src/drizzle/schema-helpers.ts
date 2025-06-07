import { timestamp } from "drizzle-orm/pg-core";


export const createdAt = timestamp('created_at', { withTimezone: true }).notNull().defaultNow()

export const updatedAt = timestamp('updated_at', { withTimezone: true }).notNull().$onUpdate(() => new Date())
export const trxNameVariant = ['SOURCE', 'RECEIVE', 'BOTH'] as const
export const familyMemberRelation = ['FATHER', 'MOTHER', 'SISTER','BROTHER', 'WIFE', 'SON','DAUGHTER'] as const
export const role = ['FAMILY','MEMBER'] as const
export const loanType = ['GIVE','TAKE'] as const
export const loanStatus = ['FULLY-PAID','DUE'] as const