import React, { RefObject, useEffect, useRef, useState } from "react";

import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

/**
 * Custom Components
 */

import ChatBubble from "../molecules/ChatBubble";

const ChatDetail = ({
  id,
  onClickBack,
}: {
  id: number | undefined;
  onClickBack: () => void;
}) => {
  const [chatData, setChatData] = useState<any>({
    id: 1,
    title: "Fastvisa",
    participants: 3,
  });

  const [messageData, setMessageData] = useState([
    {
      id: 1,
      content:
        "Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.",
      createdBy: "Mary Hilda",
      createdAt: new Date(),
    },
    {
      id: 2,
      content:
        "Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.",
      createdBy: "you",
      createdAt: new Date(),
    },
  ]);

  const [message, setMessage] = useState<string>("");

  const chatArea = useRef<HTMLDivElement | null>(null);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setMessageData((prevState) => [
      ...prevState,
      {
        id: Math.floor(Math.random() * 100),
        content: message,
        createdBy: "you",
        createdAt: new Date(),
      },
    ]);
  };

  useEffect(() => {
    chatArea.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageData]);

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
            <div className="text-primary font-bold">{chatData.title}</div>
            <div className="text-sm">{chatData.participants} participants</div>
          </div>
        </div>
        <div>
          <i className="icon-cross"></i>
        </div>
      </div>
      <ScrollArea className="chat-area flex-grow pt-5 h-[calc(100%-173px)]  px-[32px] pt-[24px]">
        <div className="space-y-5">
          {messageData.length > 0 &&
            messageData.map((data) => (
              <ChatBubble data={data} isSender={data.createdBy === "you"} />
            ))}
        </div>
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
