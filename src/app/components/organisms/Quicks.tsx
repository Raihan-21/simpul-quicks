"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import FloatingAction from "@/app/components/organisms/FloatingAction";
import FloatingActionButton from "@/app/components/atoms/FloatingActionButton";
import { action, task } from "@/app/types";
import TaskItem from "../molecules/TaskItem";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

const Quicks = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isPoppedUp, setIsPoppedUp] = useState<boolean>(false);
  const [currentPopup, setCurrentPopup] = useState<string>("");

  const [filterTask, setFilterTask] = useState<string>("");
  const [taskList, setTaskList] = useState<task[]>([
    {
      id: 1,
      title: "Task 1",
      description: "Ini adalah task pertmaa",
      completed: false,
      dueDate: new Date(),
      createdAt: new Date(),
    },
  ]);
  // const [search, setsearch] = useState(second)

  const onTaskClick = async () => {
    console.log("task active");
    setCurrentPopup("tasks");
    setIsPoppedUp((prevState) => !prevState);
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
  const addNewTask = async () => {
    const newTask: task = {
      id: Math.floor(Math.random() * 100),
      title: "",
      description: "",
      completed: false,
      dueDate: null,
      createdAt: new Date(),
    };

    setTaskList((prevState) => [...prevState, newTask]);
  };

  return (
    <div className="fixed bottom-5 right-5 max-w-[600px] w-full flex justify-end">
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

      {isPoppedUp && currentPopup === "tasks" && (
        <div className="min-w-[300px] w-full h-[300px] bg-white absolute -top-[300px] right-0 px-[32px] py-[24px] overflow-auto">
          <div className="flex justify-between gap-x-5">
            <Select>
              <SelectTrigger className="max-w-[100px]">
                <SelectValue placeholder="My Tasks" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">My Tasks</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              className="bg-primary hover:bg-primary/75"
              onClick={addNewTask}
            >
              New Task
            </Button>
          </div>
          <div className="mt-5 space-y-7">
            {taskList.length > 0 &&
              taskList.map((task, i) => <TaskItem data={task} key={i} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quicks;
