import { task } from "@/app/types";
// import { Checkbox } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Checkbox } from "../ui/checkbox";
import Datepicker from "../organisms/Datepicker";
import moment from "moment";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const TaskItem = ({ data }: { data: task }) => {
  const [taskData, setTaskData] = useState<task>(data);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<Date>(data.dueDate);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onDueDateChange = (value: any) => {
    setDueDate(value);
  };

  useEffect(() => {
    console.log(dueDate);
  }, [dueDate]);
  return (
    <div className="flex gap-x-5">
      <Checkbox
        checked={isChecked}
        onClick={() => setIsChecked((prevState) => !prevState)}
      />
      <div className="flex-grow space-y-3">
        <div className="flex justify-between">
          <div className="font-bold">{data.title}</div>
          <div className="flex items-center">
            <div>{moment(data.createdAt).format("DD/MM/YYYY")}</div>
            <i className="icon-more"></i>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <i
            className={`icon-clock  ${data.dueDate ? "text-primary" : ""} `}
          ></i>
          <Datepicker value={dueDate} onChange={setDueDate} />
        </div>
        <div className="flex items-start gap-x-3">
          <i
            className={`icon-pencil cursor-pointer ${
              data.description ? "text-primary" : ""
            } `}
            onClick={() => setIsEditing((prevState) => !prevState)}
          ></i>
          {isEditing ? (
            <div className="flex flex-col items-end gap-y-3 flex-grow">
              <Textarea className="w-full" value={data.description} />
              <Button className="bg-primary hover:bg-primary/75">Save</Button>
            </div>
          ) : (
            <div>{data.description}</div>
          )}
        </div>
      </div>
      {/* <Calendar value={data.dueDate} onChange={onDueDateChange} /> */}
    </div>
  );
};

export default TaskItem;
