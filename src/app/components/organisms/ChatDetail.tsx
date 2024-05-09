import React, { RefObject, useEffect, useRef, useState } from "react";
import * as _ from "lodash";

import axiosInstance from "@/app/axios";

import { ChatList, ChatMessage, ChatSession } from "@/app/types";

import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

/**
 * Custom Components
 */

import ChatBubble from "../molecules/ChatBubble";
import moment from "moment";

const ChatDetail = ({
  chatData,
  onClickBack,
}: {
  chatData: ChatSession;
  onClickBack: () => void;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Using any data type because there is issue with lodash functions
  const [messageData, setMessageData] = useState<any>({ messages: [] });

  const [message, setMessage] = useState<string>("");

  const chatArea = useRef<HTMLDivElement | null>(null);

  const fetchMessage = async ({ reload = true }: { reload?: boolean } = {}) => {
    if (reload) setIsLoading(true);
    try {
      const res = await axiosInstance.get(`/api/chat/${chatData.id}/messages`);
      setMessageData(
        _.chain(
          res.data.data.map((data: ChatList) => ({
            ...data,
            created_at: moment(data.created_at).format("DD/MM/YYYY"),
          }))
        )
          .groupBy("created_at")
          .map((value, key) => ({
            messages: value,
            created_at: moment(key).format("DD/MM/YYYY"),
          }))
          .value()
      );
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !messageData.length ||
      !(
        moment(messageData[messageData.length - 1].created_at).format(
          "DD/MM/YYYY"
        ) == moment(new Date()).format("DD/MM/YYYY")
      )
    ) {
      setMessageData((prevState: ChatList[]) => [
        ...prevState,
        {
          created_at: new Date(),
          messages: [
            {
              id:
                prevState.length > 0
                  ? prevState[prevState.length - 1].messages[
                      prevState[prevState.length - 1].messages.length - 1
                    ].id + 1
                  : 1,
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
          ],
        },
      ]);
    } else
      setMessageData(
        messageData.map((messages: ChatList) => {
          if (
            moment(new Date(messages.created_at)).format("DD/MM/YYYY") ==
            moment(new Date()).format("DD/MM/YYYY")
          ) {
            return {
              ...messages,
              messages: [
                ...messages.messages,

                {
                  id:
                    messages.messages.length > 0
                      ? messages.messages[messages.messages.length - 1].id + 1
                      : 1,
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
              ],
            };
          }
          return { ...messages };
        })
      );
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

  const formatChatDate = (date: Date) => {
    console.log(
      moment(date).format("DD/MM/YYYY"),
      moment(new Date()).format("DD/MM/YYYY")
    );
    if (
      moment(date).format("DD//MM/YYYY") ==
      moment(new Date()).format("DD/MM/YYYY")
    ) {
      console.log("today");
      return `Today ${moment(date).format("LL")}`;
    }
    return moment(date).format("dddd LL");
  };

  useEffect(() => {
    chatArea.current?.scrollIntoView({ behavior: "smooth" });
    console.log(messageData);
  }, [messageData]);

  useEffect(() => {
    chatArea.current?.scrollIntoView({ behavior: "smooth" });
  }, [isLoading]);

  useEffect(() => {
    fetchMessage();
  }, []);

  useEffect(() => {
    console.log(messageData);
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
              messageData.map((messages: ChatList, i: number) => (
                <>
                  <div className="relative text-dark-gray mt-3">
                    <div className="border-b-[1px] border-dark-gray"></div>

                    <div className="font-bold z-[1] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white px-5">
                      {formatChatDate(messages.created_at)}
                    </div>
                  </div>
                  {messages.messages.length > 0 &&
                    messages.messages.map((data: ChatMessage, i: number) => (
                      <ChatBubble
                        data={data}
                        //Using name as unique id because there is no authentication
                        isSender={data.user.id === 4}
                        onDelete={(id, date) => {
                          setMessageData(
                            messageData.map((messages: ChatList) => {
                              if (messages.created_at === date)
                                console.log(messages.created_at, date);
                              return {
                                ...messages,
                                messages: messages.messages.filter(
                                  (message: ChatMessage) => message.id !== id
                                ),
                              };
                            })
                          );
                          // setMessageData(
                          //   messageData.filter(
                          //     (message: ChatMessage) => message.id !== id
                          //   )
                          // );
                          // fetchMessage({ reload: false });
                        }}
                        key={i}
                      />
                    ))}
                </>
              ))}
            {/* {messageData.messages &&
              messageData.messages.length > 0 &&
              messageData.messages.map((data: any, i: number) => (
                <ChatBubble
                  data={data}
                  //Using name as unique id because there is no authentication
                  isSender={data.user.name === "You"}
                  onDelete={(id) => {
                    setMessageData(
                      messageData.filter(
                        (message: ChatMessage) => message.id !== id
                      )
                    );
                    fetchMessage({ reload: false });
                  }}
                  key={i}
                />
              ))} */}
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
