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
      iconColor: "main-orange",
      buttonColor: "light-gray",
      onClick: onTaskClick,
    },
    {
      index: 2,
      id: "chats",
      icon: "icon-answer-solid",
      iconColor: "main-purple",
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
    <div className="fixed bottom-5 right-0 max-w-[600px] w-full flex justify-end pr-5">
      <div className="hidden text-main-purple text-main-orange bg-main-purple bg-main-orange bg-dark-gray"></div>

      <Quicks
        bgColor="primary"
        actions={actions}
        onOpen={openQuicks}
        onTabClose={closeTab}
        onClose={closeQuicks}
      ></Quicks>

      {currentPopup === "tasks" && <TasksWindow />}
      {currentPopup === "chats" && <ChatWindow />}
    </div>
  );
};

export default QuicksContainer;
