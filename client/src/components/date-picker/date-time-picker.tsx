/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/components";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  label?: string;
  required?: boolean;
  date: Date;
  time: string;
  onDateChange: (date: any) => void;
  onTimeChange: (time: string) => void;
  placeholder?: string;
  buttonClassName?: string;
  popoverClassName?: string;
}

const DateTimePicker = ({
  label,
  required,
  date,
  time,
  onDateChange,
  onTimeChange,
  placeholder = "Pick a date and time",
  buttonClassName = "",
  popoverClassName = "",
}: DateTimePickerProps) => {

  return (
    <div className="mb-2 flex flex-col">
        <div>
        {label && (
          <label className="pl-1 text-sm">
            {label}
            {required && <span className="text-red-600">*</span>}
          </label>
        )}
        </div>
     <div>
     <Popover>
        <PopoverTrigger asChild>
          <Button
          variant={"outline"}
            className={cn(
                
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              buttonClassName
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "yyyy-MM-dd")
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-auto p-0", popoverClassName)}>
          <div className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onDateChange}
              initialFocus
            />
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => onTimeChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
     </div>
    </div>
  );
};

export default DateTimePicker;
