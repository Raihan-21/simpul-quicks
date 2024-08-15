import React, { RefObject, useEffect, useRef, useState } from "react";
import * as _ from "lodash";
import ClipLoader from "react-spinners/ClipLoader";

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
import useMesageStore from "@/app/store/messages";

const ChatDetail = ({
  chatData,
  onClickBack,
}: {
  chatData: ChatSession;
  onClickBack: () => void;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Using any data type because there is issue with lodash functions
  const [messageData, setMessageData] = useState<any>({
    messages: [],
    isUnread: false,
    created_at: "",
  });

  const [message, setMessage] = useState<string>("");

  const chatArea = useRef<HTMLDivElement | null>(null);

  const hasUnread = useMesageStore((state: any) => state.hasUnread);
  const setHasUnread = useMesageStore((state: any) => state.setHasUnread);

  const fetchMessage = async ({ reload = true }: { reload?: boolean } = {}) => {
    if (reload) setIsLoading(true);
    try {
      let res = await axiosInstance.get(`/api/chat/${chatData.id}/messages`);

      // Dummy nwe message\

      // res.data.data.push({
      //   id: 10001,
      //   id_chat_session: 1,
      //   id_user: 1000,
      //   content: "Morning. I’ll try to do them. Thanks",
      //   user: {
      //     id: 1000,
      //     name: "Obaidullah Amarkhil",
      //     created_at: new Date("2024-10-01").toISOString(),
      //     updated_at: new Date("2024-10-01").toISOString(),
      //   },
      //   created_at: new Date().toISOString(),
      //   updated_at: new Date().toISOString(),
      // });
      setMessageData(
        _.chain(
          res.data.data.map((data: ChatList) => ({
            ...data,
            created_date: moment(data.created_at).format("YYYY/MM/DD"),
          })),
        )

          // Group messages by created date

          .groupBy("created_date")
          .map((value, key) => {
            console.log(value);
            return {
              messages: value,
              created_at: key,
            };
          })
          .value(),
      );
      setMessageData((prevState: any) => [
        ...prevState,
        {
          messages: [
            {
              id: 10001,
              id_chat_session: 1,
              id_user: 1000,
              content: "Morning. I’ll try to do them. Thanks",
              user: {
                id: 1000,
                name: "Obaidullah Amarkhil",
                created_at: new Date("2024-10-01").toISOString(),
                updated_at: new Date("2024-10-01").toISOString(),
              },
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ],
          isUnread: true,
          created_at: moment(new Date()).format("YYYY/MM/DD"),
        },
      ]);
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setIsLoading(false);
    }
  };
  const sendmessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    try {
      setMessage("");
      const res = await axiosInstance.post(
        `/api/chat/${chatData.id}/messages`,
        {
          idUser: 4,
          content: message,
        },
      ); // Create new array of grouped chat if there is no messages today
      if (
        !messageData.length ||
        !(
          moment(messageData[messageData.length - 1].created_at).format(
            "YYYY/MM/DD",
          ) == moment(new Date()).format("YYYY/MM/DD")
        )
      ) {
        setMessageData((prevState: ChatList[]) => [
          ...prevState,
          {
            created_at: new Date(),
            messages: [
              {
                id: res.data.data.id,
                // prevState.length > 0
                //   ? prevState[prevState.length - 1].messages[
                //       prevState[prevState.length - 1].messages.length - 1
                //     ].id + 1
                //   : 1,
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
      }
      // Push message to latest grouped message
      else
        setMessageData(
          messageData.map((messages: ChatList) => {
            if (
              moment(new Date(messages.created_at)).format("YYYY/MM/DD") ==
              moment(new Date()).format("YYYY/MM/DD")
            ) {
              return {
                ...messages,
                messages: [
                  ...messages.messages,

                  {
                    id: res.data.data.id,
                    // messages.messages.length > 0
                    //   ? messages.messages[messages.messages.length - 1].id + 1
                    //   : 1,
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
          }),
        );
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const formatChatDate = (date: Date) => {
    if (
      moment(date).format("YYYY/MM/DD") ==
      moment(new Date()).format("YYYY/MM/DD")
    ) {
      return `Today ${moment(date).format("LL")}`;
    }
    return moment(new Date(date)).format("dddd LL");
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

  return (
    <div className="relative h-full">
      <div className="flex items-center justify-between border-b-[1px] border-gray px-[32px] py-[24px] pb-[24px]">
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => {
              onClickBack();
            }}
          >
            <i className="icon-arrow-left"></i>
          </button>
          <div>
            <div className="font-bold text-primary">{chatData.name}</div>

            {/* Static data placeholder because too complicated to build the db relation */}
            {chatData.is_group && <div className="text-sm">3 participants</div>}
          </div>
        </div>
      </div>
      <ScrollArea className="chat-area h-[calc(100%-173px)] flex-grow px-[32px] pt-5 pt-[24px]">
        {isLoading ? (
          <div
            className="mt-[22px] flex h-full flex-col items-center justify-center gap-y-3"
            aria-label="Loading Spinner"
            data-testid="loader"
          >
            {/* Cannot position this in the middle vertically because of custom scrollbar */}
            <ClipLoader color="#C4C4C4" size={50} />
            Loading messages...
          </div>
        ) : (
          <div className="space-y-3">
            {messageData.length > 0 &&
              messageData.map((messages: ChatList, i: number) => (
                <div className="pt-5" key={i}>
                  <div className="relative text-dark-gray">
                    {messages.isUnread ? (
                      <>
                        <div className="border-b-[1px] border-main-red"></div>

                        <div className="absolute left-[50%] top-[50%] z-[1] translate-x-[-50%] translate-y-[-50%] bg-white px-5 font-bold text-main-red">
                          New Messages
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="border-b-[1px] border-dark-gray"></div>

                        <div className="absolute left-[50%] top-[50%] z-[1] translate-x-[-50%] translate-y-[-50%] bg-white px-5 font-bold">
                          {formatChatDate(messages.created_at)}
                        </div>
                      </>
                    )}
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
                              return {
                                ...messages,
                                messages: messages.messages.filter(
                                  (message: ChatMessage) => message.id !== id,
                                ),
                              };
                            }),
                          );
                        }}
                        key={i}
                      />
                    ))}
                </div>
              ))}
          </div>
        )}
        <div ref={chatArea} className="h-0"></div>
      </ScrollArea>
      <div className="absolute bottom-0 w-full px-[32px] py-[24px]">
        <form className="flex justify-between gap-x-5" onSubmit={sendmessage}>
          <Input
            placeholder="Type a new message"
            className="border-[1px] border-black"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {!isEditing ? (
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-primary hover:bg-primary hover:bg-opacity-75"
            >
              Send
            </Button>
          ) : (
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-primary hover:bg-primary hover:bg-opacity-75"
            >
              Save
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatDetail;
