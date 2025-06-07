'use client'
import { Button } from '@/components/ui/button'
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Family, Member } from '@/drizzle/type'
import { dateFormatter } from '@/lib/date-formatter'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

type MemberTableColumn = Omit<Member & {
    family: Pick<Family, 'name'>
}, 'password'>

export const memberTableColumns: ColumnDef<MemberTableColumn>[]= [
    {
        accessorKey:'name',
        header:'Name'
    },
    {
        accessorKey:'email',
        header:'Email'
    },
    {
        accessorKey:'phone',
        header:'Phone'
    },
    {
        accessorKey:'relation',
        header:'Relation'
    },
    {
        accessorKey:'familyName',
        header:'Family Name'
    },
    {
        accessorKey:'createdAt',
        header:'Created At',
        cell:({row})=>{
            return <>{dateFormatter(row.original.createdAt)}</>
        }
    },
    {
        id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>Member details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    },
]