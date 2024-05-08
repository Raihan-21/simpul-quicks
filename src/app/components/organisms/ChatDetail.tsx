import React, { RefObject, useEffect, useRef, useState } from "react";

import axiosInstance from "@/app/axios";

import { ChatMessage, ChatSession } from "@/app/types";

import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

/**
 * Custom Components
 */

import ChatBubble from "../molecules/ChatBubble";

const ChatDetail = ({
  chatData,
  onClickBack,
}: {
  chatData: ChatSession;
  onClickBack: () => void;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [messageData, setMessageData] = useState<ChatMessage[]>([]);

  const [message, setMessage] = useState<string>("");

  const chatArea = useRef<HTMLDivElement | null>(null);

  const fetchMessage = async ({ reload = true }: { reload?: boolean } = {}) => {
    if (reload) setIsLoading(true);
    try {
      const res = await axiosInstance.get(`/api/chat/${chatData.id}/messages`);
      setMessageData(res.data.data);
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessageData((prevState) => [
      ...prevState,
      {
        id: prevState.length > 0 ? prevState[messageData.length - 1].id + 1 : 1,
        id_user: 4,
        id_chat_session: chatData.id,
        user: {
          id: 4,
          name: "You",
          created_at: new Date("2024-05-06T07:50:46.97+00:00"),
          updated_at: new Date("2024-05-06T07:50:46.97+00:00"),
        },
        content: message,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    setMessage("");

    try {
      const res = await axiosInstance.post(
        `/api/chat/${chatData.id}/messages`,
        {
          idUser: 4,
          content: message,
        }
      );
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    chatArea.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageData]);

  useEffect(() => {
    chatArea.current?.scrollIntoView({ behavior: "smooth" });
  }, [isLoading]);

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div className="relative h-full">
      <div className="flex justify-between items-center pb-[24px] px-[32px] py-[24px] border-b-[1px] border-gray">
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => {
              onClickBack();
            }}
          >
            <i className="icon-arrow-left"></i>
          </button>
          <div>
            <div className="text-primary font-bold">{chatData.name}</div>
            {chatData.is_group && <div className="text-sm">3 participants</div>}
          </div>
        </div>
        <div>
          <i className="icon-cross"></i>
        </div>
      </div>
      <ScrollArea className="chat-area flex-grow pt-5 h-[calc(100%-173px)]  px-[32px] pt-[24px]">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-5">
            {messageData.length > 0 &&
              messageData.map((data: any, i: number) => (
                <ChatBubble
                  data={data}
                  //Using name as unique id because there is no authentication
                  isSender={data.user.name === "You"}
                  onDelete={(id) => {
                    setMessageData(
                      messageData.filter((message) => message.id !== id)
                    );
                    fetchMessage({ reload: false });
                  }}
                  key={i}
                />
              ))}
          </div>
        )}
        <div ref={chatArea} className="h-0"></div>
      </ScrollArea>
      <div className="absolute bottom-0 w-full px-[32px] py-[24px]">
        <form className="flex justify-between gap-x-5 " onSubmit={sendMessage}>
          <Input
            placeholder="Type a new message"
            className="border-[1px] border-black"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-primary hover:bg-primary hover:bg-opacity-75"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatDetail;
