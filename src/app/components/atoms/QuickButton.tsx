"use client";

import React, { HTMLAttributes, ReactNode } from "react";

const FloatingActionButton = ({
  children,
  bgColor,
  className,
  onClick,
  ...props
}: {
  children: ReactNode;
  bgColor: string;
  className?: string;
  onClick: () => void;
} & HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`bg-${bgColor} flex justify-center items-center  rounded-full w-[56px] h-[56px] ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default FloatingActionButton;
