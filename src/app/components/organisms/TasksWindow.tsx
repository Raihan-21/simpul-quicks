import React, { useEffect, useRef, useState } from "react";

/**
 * Axios Config
 */

import axiosInstance from "@/app/axios";

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
 * Custom Components
 */

import TaskItem from "../molecules/TaskItem";
import ClipLoader from "react-spinners/ClipLoader";

const TasksWindow = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [taskList, setTaskList] = useState<Task[]>([]);
  const [filteredTask, setFilteredTask] = useState<Task[]>(taskList);
  const [currentFilter, setCurrentFilter] = useState<string>("all");

  const anchor = useRef<HTMLDivElement | null>(null);

  const filterTask = (value: string) => {
    setCurrentFilter(value);
  };

  const fetchTask = async () => {
    setIsLoading(true);

    try {
      const res = await axiosInstance.get("/api/task");
      setTaskList(res.data.data);
      if (currentFilter === "all") {
        setFilteredTask(res.data.data);
      } else
        setFilteredTask(
          res.data.data.filter((task: Task) => task.type === currentFilter),
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
      setFilteredTask((prevState) => [...prevState, newTask]);
      setTimeout(() => {
        anchor.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (error) {}
  };

  const onTaskDelete = (id: number) => {
    setFilteredTask(filteredTask.filter((task) => task.id !== id));
    fetchTask();
  };
  const onTaskCreate = () => {
    fetchTask();
  };
  const onTaskCheck = (id: number, value: boolean) => {
    setFilteredTask(
      filteredTask.map((task) => {
        if (task.id === id) {
          return { ...task, completed: value };
        }
        return { ...task };
      }),
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
      }),
    );
    fetchTask();
  };

  useEffect(() => {
    fetchTask();
  }, []);

  useEffect(() => {
    fetchTask();
  }, [currentFilter]);

  return (
    <div className="!absolute -top-[515px] right-0 h-[31.25rem] w-full min-w-[18.75rem] rounded-md px-5">
      <ScrollArea className="h-full rounded-md bg-white">
        <div className="px-[29px] py-4">
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
              disabled={isLoading}
              onClick={addNewTask}
            >
              New Task
            </Button>
          </div>
          <div className="">
            {isLoading ? (
              <div
                className="absolute left-[50%] top-[50%] mt-[22px] flex translate-x-[-50%] translate-y-[-100%] flex-col items-center justify-center gap-y-3"
                aria-label="Loading Spinner"
                data-testid="loader"
              >
                {/* Cannot position this in the middle vertically because of custom scrollbar */}
                <ClipLoader color="#C4C4C4" size={50} />
                Loading Task List...
              </div>
            ) : (
              <>
                {/* Task item sorted by due date in backend */}
                {filteredTask.length > 0 &&
                  filteredTask.map((task, i) => (
                    <TaskItem
                      data={task}
                      key={i}
                      onDelete={onTaskDelete}
                      onCreate={onTaskCreate}
                      onCheck={onTaskCheck}
                      onChangeType={onTaskTypeChange}
                    />
                  ))}
                <div ref={anchor}></div>
              </>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default TasksWindow;
