"use client";
import React, { useEffect, useState } from "react";

/**
 * Types
 */

import { Quick, Task } from "@/app/types";

/**
 * Shadcn UI Components
 */

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

/**
 * Axios config
 */

import axiosInstance from "@/app/axios";

/**
 * Custom Components
 */

import { ScrollArea } from "../ui/scroll-area";
import Quicks from "@/app/components/organisms/Quicks";

import ChatWindow from "./ChatWindow";
import TaskItem from "../molecules/TaskItem";

const QuicksContainer = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPopup, setCurrentPopup] = useState<string>("");

  const [taskList, setTaskList] = useState<Task[]>([]);
  const [filteredTask, setFilteredTask] = useState<Task[]>(taskList);
  // const [search, setsearch] = useState(second)

  const [currentFilter, setCurrentFilter] = useState<string>("all");

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

  const onFloatingBtnClick = async () => {
    // setIsExpanded((prevState) => !prevState);
  };

  const filterTask = (value: string) => {
    setCurrentFilter(value);
  };

  const fetchTask = async () => {
    setIsLoading(true);
    // console.log(taskList);
    // if (currentFilter === "all") {
    //   setFilteredTask(taskList);
    //   return;
    // }
    // setFilteredTask(taskList.filter((task) => task.type === currentFilter));

    try {
      const res = await axiosInstance.get("/api/task");
      setTaskList(res.data.data);
      if (currentFilter === "all") {
        setFilteredTask(res.data.data);
      } else
        setFilteredTask(
          res.data.data.filter((task: Task) => task.type === currentFilter)
        );
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const addNewTask = async () => {
    try {
      const newTask: Task = {
        id: Math.floor(Math.random() * 100),
        title: "",
        description: "",
        type: currentFilter === "urgent" ? "urgent" : "personal",
        isNew: true,
        completed: false,
        dueDate: null,
        createdAt: new Date(),
      };

      // await setTaskList((prevState) => [...prevState, newTask]);
      setFilteredTask((prevState) => [...prevState, newTask]);
      // fetchTask();
    } catch (error) {}
  };

  const onTaskDelete = (id: number) => {
    setTaskList(taskList.filter((task) => task.id !== id));
    fetchTask();
  };
  const onTaskCheck = (id: number, value: boolean) => {
    setFilteredTask(
      filteredTask.map((task) => {
        if (task.id === id) {
          return { ...task, completed: value };
        }
        return { ...task };
      })
    );
    // setFilteredTask(
    //   filteredTask.map((task) => {
    //     if (task.id === id) {
    //       return { ...task, completed: true };
    //     }
    //     return { ...task };
    //   })
    // );
    // fetchTask();
  };
  const onTaskTypeChange = (id: number, type: string) => {
    setTaskList(
      taskList.map((task) => {
        if (task.id === id) {
          return { ...task, type };
        }
        return { ...task };
      })
    );
    // setFilteredTask(
    //   filteredTask.map((task) => {
    //     if (task.id === id) {
    //       return { ...task, type };
    //     }
    //     return { ...task };
    //   })
    // );
    fetchTask();
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div className="fixed bottom-5 right-5 max-w-[600px] w-full flex justify-end">
      <Quicks
        bgColor="primary"
        // isExpanded={isExpanded}
        actions={actions}
        onClick={onFloatingBtnClick}
        onClose={() => {
          setCurrentPopup("");
        }}
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

      {currentPopup === "tasks" && (
        <ScrollArea className="min-w-[300px] w-full h-[300px] bg-white rounded-md !absolute -top-[300px] right-0">
          <div className=" px-[32px] py-[24px]">
            <div className="flex justify-between gap-x-5">
              <Select onValueChange={filterTask}>
                <SelectTrigger className="max-w-[100px]">
                  <SelectValue placeholder="My Tasks" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">My Tasks</SelectItem>
                    <SelectItem value="personal">Personal Errands</SelectItem>
                    <SelectItem value="urgent">Urgent To-Do</SelectItem>
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
            <div className="mt-[22px]">
              {isLoading ? (
                <div className="flex justify-center">Loading</div>
              ) : (
                <>
                  {filteredTask.length > 0 &&
                    filteredTask.map((task, i) => (
                      <TaskItem
                        data={task}
                        key={i}
                        onDelete={onTaskDelete}
                        onCheck={onTaskCheck}
                        onChangeType={onTaskTypeChange}
                      />
                    ))}
                </>
              )}
            </div>
          </div>
        </ScrollArea>
      )}
      {currentPopup === "chats" && <ChatWindow />}
    </div>
  );
};

export default QuicksContainer;
