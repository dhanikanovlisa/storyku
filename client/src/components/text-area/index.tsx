/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

interface TextAreaFieldProps {
  id?: string;
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  errors?: any;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ id, name, placeholder, label, disabled, errors, className, onChange, required, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="pl-1 text-sm">
            {label}
            {required && <span className="text-red-600">*</span>}
          </label>
        )}
        <Textarea
          id={id}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          className={cn("mb-1 w-full", { "border-red-600": errors?.[name] }, className)}
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

TextAreaField.displayName = "TextAreaField";

export default TextAreaField;
