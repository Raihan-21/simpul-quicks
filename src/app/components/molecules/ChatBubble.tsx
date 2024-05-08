import axiosInstance from "@/app/axios";
import moment from "moment";
import React from "react";
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
  data: any;
  isSender: boolean;
  onDelete: (id: number) => void;
}) => {
  const deleteMessage = async () => {
    try {
      const res = await axiosInstance.delete(
        `/api/chat/messages/${data.id}/delete`
      );
      onDelete(data.id);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  return (
    <div>
      {isSender ? (
        <div className="flex flex-col items-end ">
          <div className="capitalize text-second-purple font-bold">
            {data.user.name}
          </div>
          <div className="flex items-start  ">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <i className="icon-more"></i>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-red-500"
                    onClick={deleteMessage}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="rounded-sm p-[10px] bg-light-purple max-w-[400px]">
              <div className="mb-2">{data.content}</div>
              <div className="text-sm">
                {moment(data.created_at).format("hh:mm")}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="capitalize text-dark-orange font-bold">
            {data.user.name}
          </div>
          <div className="flex flex-row-reverse justify-end items-start  ">
            <button>
              <i className="icon-more"></i>
            </button>
            <div className="rounded-sm p-[10px] bg-light-orange max-w-[400px]">
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
