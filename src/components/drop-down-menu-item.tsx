import React, { JSX } from 'react'
import { DropdownMenuItem } from './ui/dropdown-menu'
import { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';

type DDMenuItemProps = React.ComponentProps<React.ForwardRefExoticComponent<DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>>> & {
    inset?: boolean;
    variant?: "default" | "destructive" | "success";
    Icon?: JSX.Element
    label: string
}

const DDMenuItem = ({ label,Icon, onClick,variant }: DDMenuItemProps) => {
    return (
        <DropdownMenuItem
            variant={variant}
            onClick={onClick}
            className={cn('flex items-center', Icon && "justify-between")}
        >
            <span>{label}</span>
            {Icon && Icon}
        </DropdownMenuItem>
    )
}

export default DDMenuItem