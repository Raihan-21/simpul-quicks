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
          <div className="bg-light-gray rounded-full w-[30px] h-[30px] flex justify-center items-center absolute -left-[100%] translate-x-[50%]">
            <i className="icon-avatar text-[10px]"></i>
          </div>
          <div className="bg-primary rounded-full w-[30px] h-[30px] flex justify-center items-center relative z-1">
            <i className="icon-avatar text-[10px] text-white"></i>
          </div>
        </div>
      ) : (
        <div className="bg-primary rounded-full w-[30px] h-[30px] flex justify-center items-center">
          <span className="text-xl text-white">{data.name?.charAt(0)}</span>
        </div>
      )}
      <div>
        <div className="flex items-center gap-x-5">
          <div className="text-primary font-bold">{data.name}</div>
          <div className="text-sm">
            {moment(
              data.lastMessage ? data.lastMessage.created_at : data.created_at
            ).format("DD/MM/YYYY hh:mm")}
          </div>
        </div>
        {data.lastMessage && (
          <div>
            <div className="text-sm font-bold">
              {data.lastMessage.user.name}:
            </div>
            <div className="text-sm">{data.lastMessage.content}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatItem;
