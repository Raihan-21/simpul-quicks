import React from "react";

const FloatingActionButton = ({ bgColor }: { bgColor: string }) => {
  return (
    <button className={`bg-${bgColor} rounded-full w-[20px] h-[20px]`}>
      FloatingActionButton
    </button>
  );
};

export default FloatingActionButton;
