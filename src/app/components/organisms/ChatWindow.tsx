import React, { useEffect, useState } from "react";

import ClipLoader from "react-spinners/ClipLoader";

import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";

/**
 * Custom Components
 */
import ChatItem from "../molecules/ChatItem";
import ChatDetail from "./ChatDetail";
import axiosInstance from "@/app/axios";
import { ChatSession } from "@/app/types";

const ChatWindow = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [filteredChats, setFilteredChats] = useState<ChatSession[]>([]);

  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [selectedChat, setSelectedChat] = useState<number>();
  const [activeTab, setActiveTab] = useState<string>("list");

  const clickDetail = (id: number) => {
    setSelectedChat(id);
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
  };

  //   const fetchDetail = () => {
  //     setChatData(chats.find((chat) => chat.id === selectedChat));
  //   };

  useEffect(() => {
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
    fetchChats();
  }, []);

  return (
    <div>
      {activeTab === "list" ? (
        <ScrollArea className="min-w-[300px] w-full h-[500px] bg-white rounded-md !absolute -top-[515px] right-0">
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
                        onClick={() => clickDetail(chat.id)}
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
        <div className="min-w-[300px] w-full h-[500px] bg-white rounded-md !absolute -top-[500px] right-0">
          <div className="  h-full max-h-full relative">
            <ChatDetail id={selectedChat!} onClickBack={back} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
