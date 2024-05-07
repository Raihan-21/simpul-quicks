import moment from "moment";
import React from "react";

const ChatBubble = ({ data, isSender }: { data: any; isSender: boolean }) => {
  return (
    <div>
      {isSender ? (
        <div className="flex flex-col items-end ">
          <div className="capitalize text-purple font-bold">
            {data.createdBy}
          </div>
          <div className="flex items-start  ">
            <button>
              <i className="icon-more"></i>
            </button>
            <div className="rounded-sm p-[10px] bg-light-purple max-w-[400px]">
              <div className="mb-2">{data.content}</div>
              <div className="text-sm">
                {moment(data.createdAt).format("hh:mm")}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="capitalize text-brown font-bold">
            {data.createdBy}
          </div>
          <div className="flex flex-row-reverse justify-end items-start  ">
            <button>
              <i className="icon-more"></i>
            </button>
            <div className="rounded-sm p-[10px] bg-light-brown max-w-[400px]">
              <div className="mb-2">{data.content}</div>
              <div className="text-sm">
                {moment(data.createdAt).format("hh:mm")}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
