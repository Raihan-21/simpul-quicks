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
      const res = await axiosInstance.get(`/api/chat//list/4`);
      setChats(res.data.data);
      setFilteredChats(res.data.data);
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
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
      })
    );
  };
  const back = () => {
    setActiveTab("list");
    fetchChats();
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div
      className=" min-w-[300px] w-full h-[500px] !absolute -top-[515px] right-0 px-5
"
    >
      {activeTab === "list" ? (
        <ScrollArea className="bg-white rounded-md h-full">
          <div className=" px-[32px] py-[24px]">
            <div>
              <div className="relative">
                <form onSubmit={searchChat}>
                  <Input
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
                <i className="icon-search absolute top-3 right-3"></i>
              </div>
              {isLoading ? (
                <div
                  className="flex flex-col items-center justify-center gap-y-3 mt-[22px]"
                  aria-label="Loading Spinner"
                  data-testid="loader"
                >
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
        <div className="bg-white rounded-md h-full">
          <div className="  h-full max-h-full relative">
            <ChatDetail chatData={selectedChat!} onClickBack={back} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
