import moment from "moment";
import React from "react";

import { ChatSession } from "@/app/types";

const ChatItem = ({
  data,
  withBorder,
}: {
  data: ChatSession;
  withBorder: boolean;
}) => {
  return (
    <div
      className={`flex items-center gap-x-5 py-[22px] ${
        withBorder ? "border-b-[1px] border-gray" : ""
      }`}
    >
      {data.is_group ? (
        <div className="relative">
          <div className="absolute -left-[100%] flex h-[30px] w-[30px] translate-x-[50%] items-center justify-center rounded-full bg-light-gray">
            <i className="icon-avatar text-[10px]"></i>
          </div>
          <div className="z-1 relative flex h-[30px] w-[30px] items-center justify-center rounded-full bg-primary">
            <i className="icon-avatar text-[10px] text-white"></i>
          </div>
        </div>
      ) : (
        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-primary">
          <span className="text-xl text-white">{data.name?.charAt(0)}</span>
        </div>
      )}
      <div className="flex-grow">
        <div className="flex items-center gap-x-5">
          <div className="font-bold text-primary">{data.name}</div>
          <div className="text-sm">
            {moment(
              data.lastMessage ? data.lastMessage.created_at : data.created_at,
            ).format("DD/MM/YYYY hh:mm")}
          </div>
        </div>
        {data.lastMessage && (
          <div className="flex w-full items-center justify-between">
            <div>
              <div className="text-sm font-bold">
                {data.lastMessage.user.name}:
              </div>
              <div className="text-sm">{data.lastMessage.content}</div>
            </div>
            {data.id === 1 && (
              <div className="h-[10px] w-[10px] rounded-full bg-red-500"></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatItem;
