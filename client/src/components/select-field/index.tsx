/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { cn } from "@/lib/utils";

export interface SelectProps {
    id:string,
    name:string,
    value?:string
  }
  interface SelectFieldProps {
    items: SelectProps[];
    value: string;
    placeholder?:string,
    label?:string,
    required?:boolean,
    className?:string,
  onValueChange: (value: string) => void;
}
const SelectField = ({ items, value, placeholder, onValueChange, label, required, className }: SelectFieldProps) => {
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
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger className={cn(className)}>
          <SelectValue placeholder={placeholder || "Select something..."} />
        </SelectTrigger>
        <SelectContent>
          {items &&
            items.map((item: any) => (
              <SelectItem key={item.id} value={item.value.toString()}>
                {item.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      </div>
    </div>
  );
};

export default SelectField;
