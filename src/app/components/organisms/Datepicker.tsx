import React, { Dispatch, SetStateAction, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";

import moment from "moment";
import { CalendarIcon } from "lucide-react";
import { SelectRangeEventHandler } from "react-day-picker";

const Datepicker = ({ value, onChange }: { value: Date; onChange: any }) => {
  const [date, setDate] = useState<Date>();
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={"outline"}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? moment(date).format("DD/MM/YYYY") : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
};

export default Datepicker;
