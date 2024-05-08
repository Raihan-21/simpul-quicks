import React, { useState } from "react";

import moment from "moment";
import { CalendarIcon } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";

const Datepicker = ({ value, onChange }: { value: Date; onChange: any }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button type="button" variant={"outline"}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? moment(value).format("DD/MM/YYYY") : "Set date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date: Date | undefined) => {
            onChange(date);
            setIsOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default Datepicker;
