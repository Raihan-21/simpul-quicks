"use client";

import React, { ReactElement, ReactNode, useState } from "react";

/**
 * Custom Components
 */

import QuickButton from "../atoms/QuickButton";
import { Quick } from "@/app/types";

const Quicks = ({
  bgColor = "primary",
  actions,
  onClick,
  onClose,
}: {
  bgColor?: string;
  actions: Quick[];
  onClick: () => void;
  onClose: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isQuickClicked, setIsQuickClicked] = useState<boolean>(false);
  const [activeQuick, setActiveQuick] = useState<Quick>();

  const calculateQuickGaps = (id: string, index: number) => {
    const quickSpace = "56px + 20px";
    if (activeQuick?.id === id) return `30%`;
    if (isQuickClicked && index > activeQuick!.index)
      return `calc(-${index} * (${quickSpace}) + ${quickSpace}`;
    return `calc(-${index} * (${quickSpace})`;
  };

  return (
    <div className="relative ">
      <QuickButton
        bgColor={isQuickClicked ? "dark-gray" : bgColor}
        onClick={() => {
          setIsExpanded((prevState) => !prevState);
          setIsQuickClicked(false);
          setActiveQuick(undefined);
          onClick();
          onClose();
        }}
        className="relative z-[1]"
      >
        <i className="icon-bolt text-2xl text-white"></i>
      </QuickButton>
      <div
        className={`${
          isExpanded ? `opacity-1 ` : "opacity-0"
        } flex flex-row-reverse justify-center items-center`}
      >
        {actions.length > 0 &&
          actions.map((action, i) => (
            <div
              className={`absolute top-0 z-[2]`}
              style={{ left: calculateQuickGaps(action.id, action.index) }}
            >
              <QuickButton
                bgColor="white"
                onClick={() => {
                  setIsQuickClicked(true);
                  setActiveQuick(action);
                  action.onClick();
                }}
                key={i}
              >
                <i
                  className={`${action.icon} text-2xl text-${action.iconColor}`}
                ></i>
              </QuickButton>
            </div>
          ))}
        {/* {children} */}
      </div>
    </div>
  );
};

export default Quicks;
