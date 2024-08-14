import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Axios Config
 */

import axiosInstance from "@/app/axios";

/**
 * Types
 */

import { Task } from "@/app/types";

import moment from "moment";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

/**
 * Custom Components
 */

import Datepicker from "../organisms/Datepicker";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

const TaskItem = ({
  data,
  onDelete,
  onCreate,
  onCheck,
  onChangeType,
}: {
  data: Task;
  onDelete: (id: number) => void;
  onCreate: () => void;
  onCheck: (id: number, completed: boolean) => void;
  onChangeType: (id: number, type: string) => void;
}) => {
  const [taskData, setTaskData] = useState<Task>(data);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [dueDate, setDueDate] = useState<Date>(data.dueDate!);

  const [errors, setErrors] = useState({
    title: "",
    dueDate: "",
  });

  const checkTask = async () => {
    setTaskData((prevState) => ({
      ...prevState,
      completed: !prevState.completed,
    }));
    try {
      const res = await axiosInstance.put(`/api/task/${taskData.id}/check`, {
        completed: !taskData.completed,
      });
    } catch (error: any) {
      console.log(error.response.data.data);
    }
  };

  const changeType = async () => {
    const type = taskData.type === "urgent" ? "personal" : "urgent";
    setTaskData((prevState) => ({ ...prevState, type }));
    if (taskData.isNew) return;
    try {
      const res = await axiosInstance.put(`/api/task/${taskData.id}/type`, {
        type,
      });

      onChangeType(taskData.id, type);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const validateField = () => {
    let isValid = true;
    if (!taskData.title) {
      isValid = false;
      setErrors((prevState) => ({
        ...prevState,
        title: "Please fill the title field",
      }));
    }
    if (!taskData.dueDate) {
      isValid = false;
      setErrors((prevState) => ({
        ...prevState,
        dueDate: "Please select the due date",
      }));
    }
    return isValid;
  };

  const saveTask = async () => {
    try {
      const isValid = validateField();
      if (!isValid) {
        setIsError(true);
        return;
      }
      setIsError(false);
      setErrors({ title: "", dueDate: "" });

      setTaskData((prevState) => ({ ...prevState, isNew: false }));
      setIsEditing(false);
      return await axiosInstance.post("/api/task", taskData);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const updateTask = async () => {
    try {
      const res = await axiosInstance.put(`/api/task/${taskData.id}`, taskData);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const changeDueDate = async (date: Date) => {
    setDueDate(date);
    setTaskData((prevState) => ({ ...prevState, dueDate: date }));
    if (taskData.isNew) return;
    try {
      const res = await axiosInstance.put(`/api/task/${taskData.id}`, {
        ...taskData,
        dueDate: date,
      });
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!taskData.isNew) {
        await updateTask();

        return;
      }
      const res = await saveTask();
      if (res?.data) onCreate();
    } catch (error) {
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
    }
  };
  const deleteTask = async () => {
    if (taskData.isNew) {
      onDelete(taskData.id);
      return;
    }
    try {
      const res = await axiosInstance.delete(`/api/task/delete/${taskData.id}`);
      onDelete(taskData.id);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (data.isNew) setIsOpen(true);
  }, []);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border-b-[1px] border-gray py-5 text-dark-gray"
    >
      <div className="flex w-full justify-between gap-x-5">
        <div className="flex items-start gap-x-[1.406rem]">
          <Checkbox checked={taskData.completed} onClick={checkTask} />
          <CollapsibleTrigger>
            {" "}
            <div>
              {!taskData.isNew ? (
                <div
                  className={`text-start font-bold text-dark-gray ${
                    taskData.completed && "text-gray line-through"
                  }`}
                >
                  {taskData.title}
                </div>
              ) : (
                <>
                  <Input
                    placeholder="Type task title"
                    value={taskData.title}
                    onChange={(e) =>
                      setTaskData((prevState) => ({
                        ...prevState,
                        title: e.target.value,
                      }))
                    }
                  />
                  {errors.title && (
                    <div className="text-red-500">{errors.title}</div>
                  )}
                </>
              )}
            </div>
          </CollapsibleTrigger>
        </div>
        <div className="flex items-center">
          <div className="pr-5">
            {moment(
              taskData.isNew ? taskData.createdAt : taskData.dueDate,
            ).format("DD/MM/YYYY")}
          </div>
          <CollapsibleTrigger>
            <motion.div animate={{ rotateZ: isOpen ? 0 : 180 }}>
              <i className="icon-chevron-up text-xs"></i>
            </motion.div>
          </CollapsibleTrigger>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <i className="icon-more"></i>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={changeType}
                >
                  Set to{" "}
                  {taskData.type === "personal"
                    ? "Urgent To-Do"
                    : "Personal Errands"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-red-600"
                  onClick={deleteTask}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <CollapsibleContent>
        <form onSubmit={submitForm} className="space-y-3 pl-8">
          <div className="flex items-start justify-between"></div>
          <div>
            <div className="flex items-center gap-x-[1.125rem]">
              <i
                className={`icon-clock ${
                  taskData.dueDate ? "text-primary" : ""
                } `}
              ></i>
              <Datepicker value={dueDate} onChange={changeDueDate} />
            </div>
            {errors.dueDate && (
              <div className="text-red-500">{errors.dueDate}</div>
            )}
          </div>
          <div className="flex items-start gap-x-[1.125rem]">
            <i
              className={`icon-pencil ${!isEditing ? "cursor-pointer" : ""} ${
                data.description ? "text-primary" : ""
              } `}
              onClick={() => setIsEditing(true)}
            ></i>
            {isEditing ? (
              <div className="flex flex-grow flex-col items-end gap-y-3">
                <Textarea
                  className="w-full"
                  value={taskData.description}
                  onChange={(e) =>
                    setTaskData((prevState) => ({
                      ...prevState,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            ) : (
              <div>
                {taskData.description ? taskData.description : "No description"}
              </div>
            )}
          </div>
          {(isEditing || taskData.isNew) && (
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/75"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading" : "Save"}
              </Button>
            </div>
          )}
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default TaskItem;
