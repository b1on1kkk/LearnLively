import { useState } from "react";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from "@nextui-org/react";
import {
  ChevronDown,
  Filter,
  GraduationCap,
  Hash,
  Landmark,
  Mail,
  UserRound,
  UsersRound
} from "lucide-react";

export const Header = () => {
  const [dropdownStatus, setDropdownStatus] = useState<boolean>(false);

  return (
    <header className="flex flex-col gap-8">
      <div className="flex items-center">
        <div className="flex-1">
          <h1 className="text-white text-2xl inline-block bg-transparent font-semibold">
            Student list
          </h1>
        </div>
        <div>
          <Dropdown
            onOpenChange={(e) => setDropdownStatus(e)}
            classNames={{ base: "shadow-2xl", content: "bg-[#050615]" }}
          >
            <DropdownTrigger>
              <Button
                variant="bordered"
                className="min-w-[150px] bg-[#050615] gap-5 justify-start border-slate-900"
              >
                <div className="flex w-full h-full items-center">
                  <div className="flex flex-1 gap-2">
                    <Filter width={20} height={20} />
                    <span>Filter</span>
                  </div>
                  <ChevronDown
                    width={17}
                    height={17}
                    className={`${
                      dropdownStatus && "rotate-180"
                    } transition-all duration-150`}
                  />
                </div>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              selectionMode="multiple"
              closeOnSelect={false}
              classNames={{ base: "bg-[#050615]" }}
            >
              <DropdownItem
                key="friends"
                description="You'll see only your friends."
                startContent={<UsersRound />}
                classNames={{ wrapper: "hover:bg-gray-900" }}
              >
                All my friends.
              </DropdownItem>
              <DropdownItem
                key="not_my_friends"
                description="You'll see only new people to you."
                startContent={<UserRound />}
                classNames={{ wrapper: "hover:bg-gray-900" }}
              >
                People new to me.
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div>
        <div className="flex p-6 bg-[#050615] rounded-2xl uppercase text-sm border-2 border-slate-900 shadow-xl">
          <div className="flex-[2] flex items-center gap-1">
            <div>
              <UserRound width={16} height={16} />
            </div>
            <span>student name</span>
          </div>
          <div className="flex-1 flex items-center gap-1">
            <div>
              <Hash width={16} height={16} />
            </div>
            <span>id number</span>
          </div>
          <div className="flex-[2] flex items-center gap-1">
            <div>
              <Mail width={16} height={16} />
            </div>
            <span>email</span>
          </div>
          <div className="flex-1 flex items-center gap-1">
            <div>
              <GraduationCap width={16} height={16} />
            </div>
            <span>semester</span>
          </div>
          <div className="flex items-center gap-1">
            <div>
              <Landmark width={16} height={16} />
            </div>
            <span>departament</span>
          </div>
        </div>
      </div>
    </header>
  );
};
