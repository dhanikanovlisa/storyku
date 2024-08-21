/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

interface InputFieldProps {
  id?:string
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  errors?: any;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ ...props }, ref) => {
    const {
      id,
      name,
      placeholder,
      type = "text",
      label,
      disabled,
      errors,
      className,
      onChange,
      required,
    } = props;

    return (
      <div className="w-full">
        {label && (
          <label className="pl-1 text-sm">
            {label}
            {required && <span className="text-red-600">*</span>}
          </label>
        )}
        <Input
          id={id}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className={cn("mb-1 w-full", { "border-red-600": errors?.[name] },  className) }
          disabled={disabled}
          ref={ref}
            {...props}
        />
        <span className="pl-1 text-xs text-red-600 min-h-[1rem] block">
          {errors?.[name] && errors[name]?.message}
        </span>
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
