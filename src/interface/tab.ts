import { CamelCase } from "."



type Value = 'defaultActive' | 'queryString'
type ClientRole = 'family' | 'member'

export type TrxTabType = 'transaction' | 'trx-name'
export type TrxNameTabType = 'details' | 'update' | 'assign'
export type ShopkeeperTabType = 'details' | 'update' | 'assign'
export type BankTabType = 'details' | 'update'
export type LoanTabType = 'details' | 'update'


// 1. Centralized tab types
type TabTypes = {
  trx: TrxTabType
  trxName: TrxNameTabType
  shopkeeper: ShopkeeperTabType
  bank: BankTabType
  loan: LoanTabType
}

// 2. Helper to create tab map
type TabMap<
  Tabs extends string,
  Mode extends Value
> = Mode extends 'defaultActive'
  ? { [T in Tabs as CamelCase<T>]: T }
  : Mode extends 'queryString'
  ? { [T in Tabs as `${CamelCase<T>}Tab`]: `?tab=${T}` }
  : never

// 3. Final type
export type DefaultActiveTab = {
  [Role in ClientRole]: {
    [Nav in keyof TabTypes as CamelCase<`${Role}-${Nav}`>]: {
      [V in Value as CamelCase<V>]: TabMap<TabTypes[Nav], V>
    }
  }
}

