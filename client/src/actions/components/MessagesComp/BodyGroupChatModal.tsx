import useStudents from "../../hooks/useStudents";
import useFirstChatLetter from "../../hooks/useFirstChatLetter";

import { Checkbox, Input, Textarea, User, cn } from "@nextui-org/react";

import { toImageLink } from "../../utils/Students/toImageLink";

import {
  GROUP_MODAL_INPUT_STYLES,
  GROUP_MODAL_TEXTAREA_STYLES
} from "../../constants/GroupModal/styles";

import type { TBodyGroupChatModal } from "../../interfaces/Students/Main";

import { Notification } from "../Notification";
import { UsersRound } from "lucide-react";

export const BodyGroupChatModal = ({
  next,
  groupHandler,
  extendedStudents,
  selectedUser,
  groupDataHandler
}: TBodyGroupChatModal) => {
  const { isLoading } = useStudents();
  const { FirstChatLetter } = useFirstChatLetter(groupHandler);

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div
          className={`flex w-[896px] h-full absolute transition-transform ${
            next.slide && "-translate-x-[448px]"
          } ease-in`}
        >
          {/* slide 1 */}
          <div className="flex gap-1.5 flex-col flex-1 px-5 py-2">
            {extendedStudents.length > 0 ? (
              <>
                {extendedStudents.map((student) => {
                  return (
                    <Checkbox
                      key={student.id}
                      aria-label={student.name}
                      classNames={{
                        base: cn(
                          "inline-flex w-full max-w-md",
                          "hover:bg-[#00010d] items-center justify-start",
                          "cursor-pointer rounded-lg gap-2 border-2 border-transparent p-2 m-0 bg-[#050615] border-slate-900",
                          `${
                            student.chosen_status && "border-primary"
                          } transition-colors`
                        ),
                        label: "w-full flex"
                      }}
                      isSelected={student.chosen_status}
                      onChange={() => selectedUser(student.id)}
                    >
                      <User
                        className="justify-start items-center"
                        name={`${student.name} ${student.lastname}`}
                        description={student.role}
                        avatarProps={{
                          src: toImageLink(student.img_hash_name)
                        }}
                      />
                    </Checkbox>
                  );
                })}
              </>
            ) : (
              <Notification
                icon={<UsersRound width={80} height={80} />}
                message="Students are not found!"
              />
            )}
          </div>

          {/* slide 2 */}
          <div className="flex-1 px-5 py-2 flex">
            <div className="flex flex-1 items-center justify-center">
              <div className="h-[100px] w-[100px] bg-orange-600 rounded-full flex items-center justify-center">
                <span className="font-bold text-4xl uppercase">
                  {FirstChatLetter}
                </span>
              </div>
            </div>
            <div className="flex-[2] flex flex-col gap-3">
              <Input
                size="md"
                isRequired
                id="title"
                name="title"
                type="group_name"
                label="Group name"
                placeholder="Enter name"
                labelPlacement="outside"
                value={groupHandler.title}
                classNames={GROUP_MODAL_INPUT_STYLES}
                variant="bordered"
                color="primary"
                onChange={groupDataHandler}
              />

              <Textarea
                id="description"
                name="description"
                label="Description"
                labelPlacement="outside"
                value={groupHandler.description}
                placeholder="Enter your description"
                classNames={GROUP_MODAL_TEXTAREA_STYLES}
                variant="bordered"
                color="primary"
                onChange={groupDataHandler}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
