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
import axiosInstance from "@/app/axios";

const Quicks = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPoppedUp, setIsPoppedUp] = useState<boolean>(false);
  const [currentPopup, setCurrentPopup] = useState<string>("");

  // const [filterTask, setFilterTask] = useState<string>("");
  const [taskList, setTaskList] = useState<task[]>([
    // {
    //   id: 1,
    //   title: "Task 1",
    //   description: "Ini adalah task pertmaa",
    //   type: "personal",
    //   completed: false,
    //   dueDate: new Date(),
    //   createdAt: new Date(),
    // },
  ]);
  const [filteredTask, setFilteredTask] = useState<task[]>(taskList);
  // const [search, setsearch] = useState(second)

  const [currentFilter, setCurrentFilter] = useState<string>("all");

  const onTaskClick = async () => {
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
          res.data.data.filter((task: task) => task.type === currentFilter)
        );
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const addNewTask = async () => {
    try {
      const newTask: task = {
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
  useEffect(() => {
    console.log(currentFilter);
    fetchTask();
  }, [currentFilter]);

  useEffect(() => {
    console.log("ALL", taskList);
  }, [taskList]);
  useEffect(() => {
    console.log("FILTERED", filteredTask);
  }, [filteredTask]);
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
        <div className="min-w-[300px] w-full h-[300px] bg-white rounded-md absolute -top-[300px] right-0 px-[32px] py-[24px] overflow-auto">
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
      )}
    </div>
  );
};

export default Quicks;
