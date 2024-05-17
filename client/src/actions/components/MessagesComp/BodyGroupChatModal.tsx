import useStudents from "../../hooks/useStudents";
import useFirstChatLetter from "../../hooks/useFirstChatLetter";

import { Checkbox, Input, Textarea, User, cn } from "@nextui-org/react";

import { toImageLink } from "../../utils/Students/toImageLink";

import type { TBodyGroupChatModal } from "../../interfaces/Students/Main";

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
            {extendedStudents.map((student) => {
              return (
                <Checkbox
                  key={student.id}
                  aria-label={student.name}
                  classNames={{
                    base: cn(
                      "inline-flex w-full max-w-md bg-content1",
                      "hover:bg-content2 items-center justify-start",
                      "cursor-pointer rounded-lg gap-2 border-2 border-transparent p-2 m-0",
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
                classNames={{ inputWrapper: "rounded-lg" }}
                onChange={groupDataHandler}
              />

              <Textarea
                id="description"
                name="description"
                label="Description"
                labelPlacement="outside"
                value={groupHandler.description}
                placeholder="Enter your description"
                classNames={{
                  base: "flex-1",
                  inputWrapper: "flex-1"
                }}
                onChange={groupDataHandler}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
