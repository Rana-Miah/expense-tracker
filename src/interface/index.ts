export * from './response'


export type NotEmptyStr<T extends string> = T extends "" ? never : T

export type Replace<Str extends string,ReplaceWith extends string="_"> =
  Str extends `${infer Head}-${infer Tail}`
  ? `${Capitalize<Head>} ${Replace<Capitalize<Tail>>}`
  : Str extends `${infer BU}_${infer AU}`
  ? `${BU} ${Replace<Capitalize<AU>>}`
  :Str extends `${infer Head} ${infer Tail}`? `${Head}${ReplaceWith}${Tail}`
  : Str


export type CamelCase<S extends string> =
  S extends `${infer Head}-${infer Tail}`
  ? `${Head}${Capitalize<CamelCase<Tail>>}`
  : S extends `${infer Head}_${infer Tail}`
  ? `${Head}${Capitalize<CamelCase<Tail>>}`
  : S;

export type FirstCharacter<Character extends string> = Character extends `${infer F}${string}` ? F : never
