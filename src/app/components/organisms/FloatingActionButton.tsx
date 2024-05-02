import React, { ReactNode } from "react";

const FloatingActionButton = ({
  children,
  bgColor,
}: {
  children: ReactNode;
  bgColor: string;
}) => {
  return (
    <div>
      <button
        className={`bg-${bgColor} rounded-full w-[20px] h-[20px]`}
      ></button>
    </div>
  );
};

export default FloatingActionButton;
