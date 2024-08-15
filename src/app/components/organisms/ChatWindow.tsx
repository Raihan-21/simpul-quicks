import React, { useEffect, useState } from "react";

import axiosInstance from "@/app/axios";

import { ChatSession } from "@/app/types";

import ClipLoader from "react-spinners/ClipLoader";

import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";

/**
 * Custom Components
 */
import ChatItem from "../molecules/ChatItem";
import ChatDetail from "./ChatDetail";

const dummyData = [
  {
    id: 1,
    is_group: true,
    lastMessage: {
      id: 1,
      id_user: 2,
      user: {
        id: 2,
        name: "Odion ighalo",
        created_at: new Date("2023-12-01"),
        updated_at: new Date("2023-12-01"),
      },
      id_chat_session: 1,
      content: "Hi, how are you today>",
      created_at: new Date("2024-01-12"),
      updated_at: new Date("2024-01-12"),
    },

    members: [],
    name: "Simpul internal group",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
  {
    id: 2,
    is_group: true,
    lastMessage: {
      id: 2,
      id_user: 1,
      user: {
        id: 1,
        name: "You",
        created_at: new Date("2023-12-01"),
        updated_at: new Date("2023-12-01"),
      },
      id_chat_session: 2,
      content: "I'm fine thanks",
      created_at: new Date("2024-01-08"),
      updated_at: new Date("2024-01-08"),
    },
    members: [],
    name: "Project group",
    created_at: new Date("2024-01-07"),
    updated_at: new Date("2024-01-07"),
  },
  {
    id: 3,
    is_group: false,
    lastMessage: {
      id: 1,
      id_user: 3,
      user: {
        id: 3,
        name: "FastVisa Support",
        created_at: "",
        updated_at: "",
      },
      id_chat_session: 3,
      content: "Hi, how are you today>",
      created_at: new Date("2024-02-20"),
      updated_at: new Date("2024-02-20"),
    },
    members: [],
    name: "FastVisa Support",
    created_at: new Date("2024-02-01"),
    updated_at: new Date("2024-02-01"),
  },
];

const ChatWindow = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [filteredChats, setFilteredChats] = useState<ChatSession[]>([]);

  const [selectedChat, setSelectedChat] = useState<ChatSession>();
  const [activeTab, setActiveTab] = useState<string>("list");

  const fetchChats = async () => {
    setIsLoading(true);
    try {
      const res = await localStorage.getItem("quicks-chats");
      const chatsData = JSON.parse(res!);
      console.log(chatsData);
      setChats(chatsData);
      setFilteredChats(chatsData);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
    // try {
    //   const res = await axiosInstance.get(`/api/chat//list/4`);
    //   setChats(res.data.data);
    //   setFilteredChats(res.data.data);
    // } catch (error: any) {
    //   console.log(error.response.data);
    // } finally {
    //   setIsLoading(false);
    // }
  };
  const clickDetail = (chat: ChatSession) => {
    setSelectedChat(chat);
    setActiveTab("detail");
  };

  const searchChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilteredChats(
      chats.filter((chat) => {
        if (!search) return chat;
        return chat.name?.toLowerCase().includes(search);
      }),
    );
  };
  const back = () => {
    setActiveTab("list");
    fetchChats();
  };

  useEffect(() => {
    const localStorageData = localStorage.getItem("quicks-chats");
    if (!localStorageData)
      localStorage.setItem("quicks-chats", JSON.stringify(dummyData));
    // console.log("LOCAL STORAGE DATA", localStorageData);
    fetchChats();
  }, []);
  useEffect(() => {
    console.log(filteredChats);
  }, [filteredChats]);

  return (
    <div className="!absolute -top-[515px] right-0 h-[500px] w-full min-w-[300px] max-w-[708px] px-5">
      {activeTab === "list" ? (
        <ScrollArea className="h-full rounded-md bg-white">
          <div className="px-[29px] py-[24px]">
            <div>
              <div className="relative">
                <form onSubmit={searchChat}>
                  <Input
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
                <i className="icon-search absolute right-3 top-3"></i>
              </div>
              {isLoading ? (
                <div
                  className="mt-[22px] flex flex-col items-center justify-center gap-y-3"
                  aria-label="Loading Spinner"
                  data-testid="loader"
                >
                  {/* Cannot position this in the middle vertically because of custom scrollbar */}
                  <ClipLoader color="#C4C4C4" size={50} />
                  Loading chats...
                </div>
              ) : (
                <div>
                  {filteredChats.length > 0 &&
                    filteredChats.map((chat, i) => (
                      <div
                        className="cursor-pointer"
                        onClick={() => clickDetail(chat)}
                        key={i}
                      >
                        <ChatItem
                          data={chat}
                          withBorder={i !== chats.length - 1}
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      ) : (
        <div className="h-full rounded-md bg-white">
          <div className="relative h-full max-h-full">
            <ChatDetail chatData={selectedChat!} onClickBack={back} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
