import React, { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";

const ChatWindow = () => {
  const [search, setSearch] = useState<string>("");
  const [chats, setChats] = useState([]);

  return (
    <ScrollArea className="min-w-[300px] w-full h-[300px] bg-white rounded-md !absolute -top-[300px] right-0">
      <div className=" px-[32px] py-[24px]">
        <div className="relative">
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="icon-search absolute top-3 right-3"></i>
        </div>
        {chats.length > 0 && chats.map((chat) => <div></div>)}
      </div>
    </ScrollArea>
  );
};

export default ChatWindow;
