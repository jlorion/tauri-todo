import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-2 border-gray-300 focus:border-cyan-500  flex field-sizing-content min-h-50 w-full rounded-md  bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
