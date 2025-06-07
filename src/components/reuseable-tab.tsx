"use client"

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import { NotEmptyStr, Replace } from "@/interface"
import { useQueryString } from "@/hooks/use-query-string"
import { cn } from "@/lib/utils"
import React, { JSX } from "react"


export type TabItem<T extends string> = {
  label: Capitalize<Replace<NotEmptyStr<T>>>;
  value: NotEmptyStr<T>;
  content: React.ReactNode;
  Icon?: JSX.Element;
}


type ReadOnlyArr<Str extends string> = ReadonlyArray<TabItem<Str>>
type DefaultValue<T extends string> = ReadOnlyArr<T>[number]['value']

type TabsProps<T extends string> = {
  items: ReadOnlyArr<T>;
  defaultValue?: DefaultValue<T>;
  className?: string;
  removeKeyOfValues?: T[]
}

export const ReuseableTab = <T extends string>({
  items,
  removeKeyOfValues,
  defaultValue,
  className,
}: TabsProps<T>) => {
  const safeDefault = defaultValue ?? items[0]?.value
  const { rowSearchParams, setQueryParams } = useQueryString()

  // get the tab query
  const isTabSearchQuery = rowSearchParams.has('tab')

  return (
    <Tabs defaultValue={safeDefault} className={className}>
      <TabsList>
        {items.map(({ Icon, ...item }) => (
          <div key={item.value}>
            {
              isTabSearchQuery
                ? (
                  <TabsTrigger

                    value={item.value}
                    className={cn("", Icon && "min-w-22")}
                    onClick={
                      () => setQueryParams('tab', item.value, removeKeyOfValues)
                    }>
                    <div className={cn("", Icon && "flex items-center gap-1.5 w-full")}>
                      <span>{item.label}</span>
                      {Icon && Icon}
                    </div>

                  </TabsTrigger>
                ) : (
                  <TabsTrigger
                    value={item.value}
                    className={cn("", Icon && "min-w-22")}>
                    <div className={cn("", Icon && "flex items-center gap-1.5 w-full")}>
                      <span>{item.label}</span>
                      {Icon && Icon}
                    </div>

                  </TabsTrigger>
                )
            }
          </div>

        ))}
      </TabsList>

      {items.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
