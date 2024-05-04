import { task } from "@/app/types";
// import { Checkbox } from "@chakra-ui/react";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { Checkbox } from "../ui/checkbox";
import Datepicker from "../organisms/Datepicker";

const TaskItem = ({ data }: { data: task }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const onDueDateChange = (value: any) => {};

  return (
    <div className="flex gap-x-5">
      <Checkbox
        checked={isChecked}
        onClick={() => setIsChecked((prevState) => !prevState)}
      />
      <div className="font-bold">{data.title}</div>
      <Datepicker value={data.dueDate} />
      {/* <Calendar value={data.dueDate} onChange={onDueDateChange} /> */}
    </div>
  );
};

export default TaskItem;
