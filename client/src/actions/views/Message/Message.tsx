import { useState, Key } from "react";
import useChats from "../../hooks/useChats";
import useStudents from "../../hooks/useStudents";
import useGroupChangeListener from "../../hooks/useGroupChangeListener";

import { Bot, UsersRound } from "lucide-react";
import { Outlet, useOutlet } from "react-router-dom";
import { useDisclosure, Tabs, Tab } from "@nextui-org/react";

import { Loading } from "../../components/Loading/Loading";
import { Notification } from "../../components/Notification";
import { SystemButton } from "../../components/SystemButton";
import { ChatsType } from "../../components/ChatsType/ChatsType";
import { GroupChatModal } from "../../components/MessagesComp/GroupChatModal";

import type { TChats, TGroups } from "../../interfaces/Message/Chats";

export const Message = () => {
  const outlet = useOutlet();

  const [selectedChatType, setSelectedChatType] =
    useState<Exclude<Key, bigint>>("private");

  // for group modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // data handlers
  const { isLoading } = useChats<TChats | Array<TGroups>>(selectedChatType);

  // get all students when modal is open
  useStudents(isOpen);

  // read about hook inside
  useGroupChangeListener();

  return (
    <div className="flex h-full relative p-8 gap-8 w-full">
      <main className="bg-[#050615] rounded-2xl shadow-2xl border-slate-900 border-2 overflow-auto z-10 flex-[2]">
        {outlet ? (
          <Outlet />
        ) : (
          <Notification
            icon={<Bot width={80} height={80} />}
            message="Select chat to start chatting!"
          />
        )}
      </main>

      <aside className="z-10 w-[380px] bg-[#050615] rounded-2xl shadow-2xl border-2 border-slate-900 p-3 flex flex-col text-slate-400 gap-2">
        <header className="flex items-center gap-3">
          <Tabs
            size="md"
            aria-label="type chat tabs"
            color="primary"
            variant="bordered"
            selectedKey={selectedChatType}
            onSelectionChange={setSelectedChatType}
            classNames={{ base: "flex-1", tabList: "flex-1 border-slate-900" }}
          >
            <Tab key="private" title="Private chats" />
            <Tab key="group" title="Group chats" />
          </Tabs>

          <SystemButton
            label="create_group"
            icon={<UsersRound width={18} height={18} />}
            onClick={() => onOpen()}
          />
        </header>

        <main className="flex flex-col flex-1 gap-2">
          {/* in development */}
          {isLoading ? <Loading /> : <ChatsType type={selectedChatType} />}
        </main>
      </aside>

      <GroupChatModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </div>
  );
};
