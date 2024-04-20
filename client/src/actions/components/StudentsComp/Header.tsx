import { useEffect, useMemo, useState } from "react";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from "@nextui-org/react";
import { ChevronDown, Filter } from "lucide-react";

import { userFiltration } from "../../utils/Students/userFiltration";
import { selectedValueSplitting } from "../../utils/Students/selectedValueSplitting";

import { DROPDOWN_FILTER } from "../../constants/Students/dropdown_filter";
import { HEADER } from "../../constants/Students/header";
import type { THeader } from "../../interfaces/Students/Header";

export const Header = ({ tempStudents, setStudents }: THeader) => {
  const [dropdownStatus, setDropdownStatus] = useState<boolean>(false);

  const [selectedKeys, setSelectedKeys] = useState(new Set(["all_students"]));
  const selectedValue = useMemo(() => {
    return selectedValueSplitting(selectedKeys);
  }, [selectedKeys]);

  useEffect(() => {
    userFiltration(selectedValue, tempStudents, setStudents);
  }, [selectedValue]);

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
            classNames={{
              base: "shadow-2xl text text-slate-400",
              content: "bg-[#050615]"
            }}
          >
            <DropdownTrigger>
              <Button
                variant="bordered"
                className="min-w-[150px] bg-[#050615] gap-5 justify-start border-slate-900 text-slate-400 font-semibold"
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
              selectionMode="single"
              classNames={{ base: "bg-[#050615]" }}
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              {DROPDOWN_FILTER.map((item) => {
                return (
                  <DropdownItem
                    key={item.key}
                    description={item.description}
                    startContent={item.startContent}
                    classNames={{ wrapper: "hover:bg-gray-900" }}
                  >
                    {item.text}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div>
        <div className="flex p-6 bg-[#050615] rounded-2xl uppercase text-sm border-2 border-slate-900 shadow-xl gap-3">
          {HEADER.map((item) => {
            return (
              <div className={item.className} key={item.id}>
                <div>{item.icon}</div>
                <span>{item.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
};
