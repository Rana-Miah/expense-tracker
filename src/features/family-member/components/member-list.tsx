import { CardWrapper } from "@/components/card-wrapper"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { db } from "@/drizzle/db"
import { familyMembersTable } from "@/drizzle/schema"
import { pluralize } from "@/lib/helpers/plural"
import { eq } from "drizzle-orm"
import { memberTableColumns } from "./member-table-columns"

export const FamilyMemberList = async ({ currentFamilyId }: { currentFamilyId: string }) => {
    const familyMembers = await db.query.familyMembersTable.findMany({
        where: eq(familyMembersTable.familyId, currentFamilyId),
        with: {
            family: true
        }
    })
    const formattedMembers = familyMembers.map(member => ({
        ...member,
        familyName: member.family.name
    }))

    const totalMembers = familyMembers.length
    return (
        <CardWrapper
            title={pluralize(totalMembers, "Member")}
            description={totalMembers > 0 ? "Your family Members" : "Register Your First Family Member"}
        >
            <div>
                {
                    totalMembers > 0
                        ? <DataTable data={formattedMembers} columns={memberTableColumns} />
                        : <Button >
                            Create Member
                        </Button>
                }
            </div>
        </CardWrapper>
    )

}