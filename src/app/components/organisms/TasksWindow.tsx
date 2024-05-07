import React, { useEffect, useState } from "react";

/**
 * Types
 */

import { Task } from "@/app/types";

/**
 * Shadcn UI Components
 */

import { ScrollArea } from "../ui/scroll-area";
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
 * Axios Config
 */

import axiosInstance from "@/app/axios";

/**
 * Custom Components
 */

import TaskItem from "../molecules/TaskItem";

const TasksWindow = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [taskList, setTaskList] = useState<Task[]>([]);
  const [filteredTask, setFilteredTask] = useState<Task[]>(taskList);
  const [currentFilter, setCurrentFilter] = useState<string>("all");

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

  useEffect(() => {
    fetchTask();
  }, [currentFilter]);

  return (
    <ScrollArea className="min-w-[300px] w-full h-[500px] bg-white rounded-md !absolute -top-[515px] right-0">
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
  );
};

export default TasksWindow;
