import { CardWrapper } from "@/components/card-wrapper";
import { Member } from "@/features/family-member/components/member";
import { currentMember } from "@/lib/current-member";
import { CircleArrowRight } from "lucide-react";
import Link from "next/link";

const RootPage = async () => {

  const loggedMember = await currentMember()
  const familyMembers = [
    {
      id: 1,
      name: "Rana Miah",
      phone: "0569655824"
    },
    {
      id: 2,
      name: "Joshim Uddin",
      phone: "01628674339"
    },
    {
      id: 3,
      name: "Renu Akter",
      phone: "01838073439"
    },
    {
      id: 4,
      name: "Tanjila Akter",
      phone: "01785585238"
    },
    {
      id: 5,
      name: "Mim Akter",
      phone: "0569655824"
    },
    {
      id: 6,
      name: "Rohan Miah",
      phone: "0569655824"
    },
    {
      id: 7,
      name: "Raiyan Hamid",
      phone: "0569655824"
    },
    {
      id: 8,
      name: "Raisa",
      phone: "0569655824"
    },
  ]
  return (
    <div className="flex flex-col gap-4">
      <CardWrapper
        title="Family Expense"
        description="Manage your family all kind of expense"
      >
        <Link href='/family-page' className="flex items-center gap-2">
          <p>Let's start</p>
          <CircleArrowRight size={20} />
        </Link>
      </CardWrapper>

      {loggedMember
        ? <Member member={{ name: loggedMember.name, phone: loggedMember.phone, id: 1 }} />
        : <CardWrapper
          title="Family Members"
          description=" Manage your expense"
        >
          <div className="grid grid-cols-2 gap-4 w-full">
            {
              familyMembers.map(
                member => <Member key={member.id} member={member} />
              )
            }
          </div>
        </CardWrapper>
      }
    </div>
  );
}



export default RootPage