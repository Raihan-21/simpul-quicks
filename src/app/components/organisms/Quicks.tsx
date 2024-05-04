"use client";
import React, { useState } from "react";
import Image from "next/image";
import FloatingAction from "@/app/components/organisms/FloatingAction";
import FloatingActionButton from "@/app/components/atoms/FloatingActionButton";
import { action } from "@/app/types";

const Quicks = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [currentPopup, setCurrentPopup] = useState<string>("");

  const onTaskClick = async () => {
    console.log("task active");
    setCurrentPopup("tasks");
    setShowPopup(true);
  };
  const [actions, setActions] = useState<action[]>([
    {
      id: "tasks",
      icon: "/icons/icon-bookmark.svg",
      buttonColor: "light-gray",
      onClick: onTaskClick,
    },
  ]);

  const onFloatingBtnClick = async () => {
    console.log("expand");
    // setIsExpanded((prevState) => !prevState);
  };
  return (
    <FloatingAction
      bgColor="primary"
      // isExpanded={isExpanded}
      actions={actions}
      onClick={onFloatingBtnClick}
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
    </FloatingAction>
  );
};

export default Quicks;
