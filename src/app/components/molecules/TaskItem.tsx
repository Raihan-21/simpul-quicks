import { task } from "@/app/types";
// import { Checkbox } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Checkbox } from "../ui/checkbox";
import Datepicker from "../organisms/Datepicker";
import moment from "moment";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import axiosInstance from "@/app/axios";

const TaskItem = ({
  data,
  onDelete,
  onCheck,
  onChangeType,
}: {
  data: task;
  onDelete: (id: number) => void;
  onCheck: (id: number) => void;
  onChangeType: (id: number, type: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [taskData, setTaskData] = useState<task>(data);
  const [dueDate, setDueDate] = useState<Date>(data.dueDate!);

  const [errors, setErrors] = useState({
    title: "",
    dueDate: "",
  });

  const onDueDateChange = (value: any) => {
    setDueDate(value);
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
    // if (!taskData.dueDate) {
    //   setIsError(true);
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     dueDate: "Please select the due date",
    //   }));
    // }
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

      const res = await axiosInstance.post("/api/task", taskData);
      setIsEditing(false);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const updateTask = async () => {
    try {
      const res = await axiosInstance.put(`/api/task/${taskData.id}`, taskData);
      console.log(res);
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
      await saveTask();
    } catch (error) {
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
    }
  };
  const deleteTask = () => {
    onDelete(taskData.id);
  };
  const checkTask = () => {
    onCheck(taskData.id);
    setIsChecked((prevState) => !prevState);
  };
  const changeType = () => {};
  return (
    <div className="flex gap-x-5 border-b-[1px] border-gray py-[22px] text-dark-gray">
      <Checkbox checked={isChecked} onClick={checkTask} />
      <div className="flex-grow ">
        <form onSubmit={submitForm} className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              {!taskData.isNew ? (
                <div
                  className={`font-bold ${
                    (taskData.completed || isChecked) && "line-through"
                  }`}
                >
                  {taskData.title}
                </div>
              ) : (
                <>
                  <Input
                    className="mb-3"
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
            <div className="flex items-center">
              <div>{moment(taskData.createdAt).format("DD/MM/YYYY")}</div>
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
          <div className="flex items-center gap-x-3">
            <i
              className={`icon-clock  ${
                taskData.dueDate ? "text-primary" : ""
              } `}
            ></i>
            <Datepicker value={dueDate} onChange={setDueDate} />
          </div>
          <div className="flex items-start gap-x-3">
            <i
              className={`icon-pencil ${!isEditing ? "cursor-pointer" : ""} ${
                data.description ? "text-primary" : ""
              } `}
              onClick={() => setIsEditing(true)}
            ></i>
            {isEditing ? (
              <div className="flex flex-col items-end gap-y-3 flex-grow">
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
      </div>
    </div>
  );
};

export default TaskItem;
