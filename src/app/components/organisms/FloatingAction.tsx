"use client";

import Image from "next/image";
import React, { ReactElement, ReactNode, useState } from "react";
import FloatingActionButton from "../atoms/FloatingActionButton";
import { Action } from "@/app/types";

const FloatingAction = ({
  bgColor = "primary",
  actions,
  onClick,
}: {
  bgColor?: string;
  actions: Action[];
  onClick: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="relative ">
      <FloatingActionButton
        bgColor={bgColor}
        onClick={() => {
          setIsExpanded((prevState) => !prevState);
          onClick();
        }}
        className="relative z-[1]"
      >
        <Image
          src={"/icons/icon-bolt.svg"}
          width={24}
          height={24}
          alt="icon-bolt"
        />
      </FloatingActionButton>
      <div
        className={` ${
          isExpanded ? `opacity-1 -left-[${2 * 100}%]` : "opacity-0"
        } absolute top-0  flex flex-row-reverse justify-center items-center `}
      >
        {actions.length > 0 &&
          actions.map((action, i) => (
            <FloatingActionButton
              bgColor={action.buttonColor}
              onClick={() => {
                action.onClick();
              }}
              key={i}
            >
              <Image src={action.icon} width={24} height={24} alt="icon-bolt" />
            </FloatingActionButton>
          ))}
        {/* {children} */}
      </div>
    </div>
  );
};

export default FloatingAction;
