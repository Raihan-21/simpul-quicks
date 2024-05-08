import React, { useEffect, useState } from "react";

import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";

/**
 * Custom Components
 */
import ChatItem from "../molecules/ChatItem";
import ChatDetail from "./ChatDetail";
import axiosInstance from "@/app/axios";

const ChatWindow = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [chats, setChats] = useState([
    {
      id: 1,
      image: null,
      title: "Simpul",
      createdAt: new Date(),
      lastMessage: {
        name: "Ellen",
        content: "Hey there! Welcome to your inbox.",
      },
    },
    {
      id: 2,
      image: null,
      title: "Simpul",
      createdAt: new Date(),
      lastMessage: {
        name: "Ellen",
        content: "Hey there! Welcome to your inbox.",
      },
    },
  ]);

  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [selectedChat, setSelectedChat] = useState<number>();
  const [activeTab, setActiveTab] = useState<string>("list");

  const clickDetail = (id: number) => {
    setSelectedChat(id);
    setActiveTab("detail");
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
                <Input
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i className="icon-search absolute top-3 right-3"></i>
              </div>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <div>
                  {chats.length > 0 &&
                    chats.map((chat, i) => (
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
