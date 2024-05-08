"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Quick } from "@/app/types";

/**
 * Custom Components
 */

import QuickButton from "../atoms/QuickButton";

const Quicks = ({
  bgColor = "primary",
  actions,
  onOpen,
  onTabClose,
  onClose,
}: {
  bgColor?: string;
  actions: Quick[];
  onOpen: () => void;
  onTabClose: () => void;
  onClose: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isQuickClicked, setIsQuickClicked] = useState<boolean>(false);
  const [activeQuick, setActiveQuick] = useState<Quick>();

  const calculateQuickGaps = (id: string, index: number) => {
    const quickSpace = "56px + 20px";
    if (activeQuick?.id === id) return `0`;
    if (isQuickClicked && index > activeQuick!.index)
      return `calc(-${index} * (${quickSpace}) + ${quickSpace}`;
    return `calc(-${index} * (${quickSpace})`;
  };
  const calculateQuickGapsAnimation = (id: string, index: number) => {
    const quickSpace = 56 + 20;
    if (activeQuick?.id === id) return 0;
    if (isQuickClicked && index > activeQuick!.index)
      return -index * quickSpace + quickSpace;
    return -index * quickSpace;
  };

  return (
    <div className="relative ">
      <motion.div
        className="relative"
        animate={{
          x: isQuickClicked ? "-20%" : "0",
          zIndex: isQuickClicked ? 1 : 3,
        }}
      >
        <QuickButton
          bgColor={isQuickClicked ? "dark-gray" : bgColor}
          onClick={() => {
            setIsExpanded((prevState) => !prevState);
            setIsQuickClicked(false);
            setActiveQuick(undefined);
            onOpen();
            onClose();
          }}
          className={`relative`}
        >
          <i className="icon-bolt text-2xl text-white"></i>
        </QuickButton>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div>
            {actions.length > 0 &&
              actions.map((action, i) => (
                <motion.div
                  className={`absolute top-0 z-[2]`}
                  initial={{ left: 0 }}
                  animate={{
                    left: calculateQuickGapsAnimation(action.id, action.index),
                  }}
                  exit={{ left: 0 }}
                  key={action.id}
                >
                  <QuickButton
                    bgColor={`${
                      activeQuick?.id === action.id ? action.iconColor : "white"
                    }`}
                    onClick={() => {
                      setIsQuickClicked(true);
                      setActiveQuick(action);
                      action.onClick();
                    }}
                  >
                    <i
                      className={`text-2xl ${action.icon}  text-${
                        activeQuick?.id === action.id
                          ? "white"
                          : action.iconColor
                      }`}
                    ></i>
                  </QuickButton>
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quicks;
