import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"

type CardWrapperProps = {
    title: string;
    description: string;
    children: ReactNode;
    headerElement?:ReactNode
}

export const CardWrapper = ({ title, description, children ,headerElement}: CardWrapperProps) => {
    return <Card className="p-1.5 gap-2">
        <CardHeader className="p-1.5">
            <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                {headerElement}
            </div>
        </CardHeader>

        <CardContent className="p-1.5">
            {children}
        </CardContent>
    </Card>

}