import { Replace } from "@/interface"

type CommonTrxName = 'INCOME' | 'WITHDRAWAL' | 'DEPOSIT' | 'TRANSFER' | 'EXCHANGE' | 'EXPENSE' | 'CASH OUT' | 'CASH IN' | 'SEND MONEY'

type CommonTrxNameMap<T extends string> = {
    [Key in T as Replace<Key>]: Key
}

export const COMMON_TRX_NAME: CommonTrxNameMap<CommonTrxName> = {
    INCOME: 'INCOME',
    CASH_IN: 'CASH IN',
    CASH_OUT: 'CASH OUT',
    DEPOSIT: 'DEPOSIT',
    EXCHANGE: 'EXCHANGE',
    EXPENSE: 'EXPENSE',
    SEND_MONEY: 'SEND MONEY',
    TRANSFER: 'TRANSFER',
    WITHDRAWAL: 'WITHDRAWAL'
}

export const trxsNameReceiveByCash = [COMMON_TRX_NAME.WITHDRAWAL,COMMON_TRX_NAME.CASH_OUT]
export const trxsNameSourceByCash = [COMMON_TRX_NAME.DEPOSIT]