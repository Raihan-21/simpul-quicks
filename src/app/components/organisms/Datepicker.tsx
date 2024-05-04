import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";

import moment from "moment";
import { CalendarIcon } from "lucide-react";

const Datepicker = ({ value }: { value: Date }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={"outline"}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? moment(value).format("DD/MM/YYYY") : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar />
      </PopoverContent>
    </Popover>
  );
};

export default Datepicker;
