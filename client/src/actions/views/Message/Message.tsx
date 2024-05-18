import useChats from "../../hooks/useChats";
import { useEffect, useState, Key } from "react";
import { useDisclosure } from "@nextui-org/react";
import useStudents from "../../hooks/useStudents";
import { useDispatch, useSelector } from "react-redux";

import { Bot, UsersRound } from "lucide-react";
import { Outlet, useOutlet } from "react-router-dom";

import { Loading } from "../../components/Loading/Loading";
import { Notification } from "../../components/Notification";
import { SystemButton } from "../../components/SystemButton";
import { GroupChatModal } from "../../components/MessagesComp/GroupChatModal";

import { AppDispatch, RootState } from "../../store/store";
import { chatSocketAcitons } from "../../store/features/chatSocket.slice";
import { chosenUserChatActions } from "../../store/features/chosenUserChat.slice";
import { messagesActions } from "../../store/features/messages.slice";

import { Tabs, Tab } from "@nextui-org/react";
import { TChats, TGroups } from "../../interfaces/Message/Chats";

import { ChatsType } from "../../components/ChatsType/ChatsType";

export const Message = () => {
  const outlet = useOutlet();

  const [selectedChatType, setSelectedChatType] =
    useState<Exclude<Key, bigint>>("private");

  // for modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // data handlers
  const { isLoading } = useChats<TChats | TGroups>(selectedChatType);
  const { refetch } = useStudents();

  const dispatch = useDispatch<AppDispatch>();
  const { chat_socket } = useSelector((s: RootState) => s.chatSocket);

  // listener
  useEffect(() => {
    if (chat_socket) chat_socket.getJustCreatedChats();

    // remove all previous data if user leave "message" page after some action
    return () => {
      dispatch(chatSocketAcitons.chosenConvIdInit(null));
      dispatch(chosenUserChatActions.chosenUserInit(null));
      dispatch(
        messagesActions.messageInit({ chosenMessage: null, messages: [] })
      );
    };
  }, [chat_socket]);

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

      <aside className="z-10 flex-1 bg-[#050615] rounded-2xl shadow-2xl border-2 border-slate-900 p-3 flex flex-col text-slate-400 gap-2">
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
            onClick={() => {
              refetch();
              onOpen();
            }}
          />
        </header>

        <main className="flex flex-col flex-1 gap-2">
          {/* in development */}
          {/* {isLoading ? <Loading /> : <ChatsType type={selectedChatType} />} */}
        </main>
      </aside>

      <GroupChatModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};
