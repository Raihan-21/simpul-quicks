"use client";
import React, { useState } from "react";

/**
 * Types
 */

import { Quick } from "@/app/types";

/**
 * Custom Components
 */

import Quicks from "@/app/components/organisms/Quicks";
import ChatWindow from "./ChatWindow";
import TasksWindow from "./TasksWindow";

const QuicksContainer = () => {
  const [currentPopup, setCurrentPopup] = useState<string>("");

  // const [search, setsearch] = useState(second)

  const onTaskClick = async () => {
    setCurrentPopup("tasks");
  };
  const showMessageWindow = () => {
    setCurrentPopup("chats");
  };
  const [actions, setActions] = useState<Quick[]>([
    {
      index: 1,
      id: "tasks",
      icon: "icon-bookmark",
      iconColor: "brown",
      buttonColor: "light-gray",
      onClick: onTaskClick,
    },
    {
      index: 2,
      id: "chats",
      icon: "icon-answer-solid",
      iconColor: "purple",
      buttonColor: "light-gray",
      onClick: showMessageWindow,
    },
    {
      index: 3,
      id: "search",
      icon: "icon-search",
      iconColor: "purple",
      buttonColor: "light-gray",
      onClick: showMessageWindow,
    },
  ]);

  const openQuicks = async () => {
    // setIsExpanded((prevState) => !prevState);
  };

  const closeTab = () => {
    setCurrentPopup("");
  };
  const closeQuicks = () => {
    setCurrentPopup("");
  };

  return (
    <div className="fixed bottom-5 right-5 max-w-[600px] w-full flex justify-end">
      <Quicks
        bgColor="primary"
        // isExpanded={isExpanded}
        actions={actions}
        onOpen={openQuicks}
        onTabClose={closeTab}
        onClose={closeQuicks}
      >
        {/* <FloatingActionButton bgColor="light-gray" onClick={onTaskClick}>
        <Image
          src={"/icons/icon-answer-outlined.svg"}
          width={24}
          height={24}
          alt="icon-bolt"
        />
      </FloatingActionButton>
      <FloatingActionButton bgColor="light-gray" onClick={onTaskClick}>
        <Image
          src={"/icons/icon-bookmark.svg"}
          width={24}
          height={24}
          alt="icon-bolt"
        />
      </FloatingActionButton> */}
      </Quicks>

      {currentPopup === "tasks" && <TasksWindow />}
      {currentPopup === "chats" && <ChatWindow />}
    </div>
  );
};

export default QuicksContainer;
