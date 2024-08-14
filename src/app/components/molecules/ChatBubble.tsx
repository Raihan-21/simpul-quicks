import moment from "moment";
import React from "react";

import axiosInstance from "@/app/axios";

import { ChatMessage } from "@/app/types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const ChatBubble = ({
  data,
  isSender,
  onDelete,
}: {
  data: ChatMessage;
  isSender: boolean;
  onDelete: (id: number, date: Date) => void;
}) => {
  const deleteMessage = async () => {
    try {
      const res = await axiosInstance.delete(
        `/api/chat/messages/${data.id}/delete`,
      );
      onDelete(data.id, data.created_at);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  return (
    <div>
      {isSender ? (
        <div className="flex flex-col items-end pt-[12px]">
          <div className="font-bold capitalize text-second-purple">
            {data.user.name}
          </div>
          <div className="flex items-start">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <i className="icon-more"></i>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="cursor-pointer text-red-500"
                    onClick={deleteMessage}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="max-w-[400px] rounded-[5px] bg-light-purple p-[10px]">
              <div className="mb-2">{data.content}</div>
              <div className="text-sm">
                {moment(data.created_at).format("hh:mm")}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col pt-[12px]">
          <div className="font-bold capitalize text-dark-orange">
            {data.user.name}
          </div>
          <div className="flex flex-row-reverse items-start justify-end">
            <button>
              <i className="icon-more"></i>
            </button>
            <div className="max-w-[400px] rounded-sm bg-light-orange p-[10px]">
              <div className="mb-2">{data.content}</div>
              <div className="text-sm">
                {moment(data.created_at).format("hh:mm")}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
