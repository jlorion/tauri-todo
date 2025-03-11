import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "border-2 border-gray-300 rounded-md transition-[color,box-shadow] outline-none flex w-full",
  {
    variants: {
      focus: {
        default: "focus:border-cyan-500",
        outline: "focus:border-blue-500 focus:bg-transparent",
        filled: "focus:bg-gray-300",
        ghost: "focus:border-gray-400 focus:bg-transparent",
      },
      size: {
        sm: "h-8 text-sm px-2",
        md: "h-10 text-base px-3",
        lg: "h-12 text-lg px-4",
      },
      icon: {
        left: "pl-10", // Add padding to the left when an icon is present
        right: "pr-10", // Add padding to the right when an icon is present
      }
    },
    defaultVariants: {
      focus: "default",
      size: "md",
    },
  }
);

const Input = React.forwardRef(({ className, focus, size, icon, iconPosition = "left", ...props }, ref) => {
  return (
    <div className="relative flex items-center w-full">
      {icon && iconPosition === "left" && (
        <div className="absolute left-3">
          {icon}
        </div>
      )}
      <input
        ref={ref}
        className={cn(inputVariants({ focus, size, icon: icon ? iconPosition : undefined }), className)}
        {...props}
      />
      {icon && iconPosition === "right" && (
        <div className="absolute right-3">
          {icon}
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input, inputVariants };