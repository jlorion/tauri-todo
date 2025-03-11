import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DatePicker } from "../ui/datepicker";

const MyDropdown = ({
  dialogTitle,
  children,
  buttons = [],
}) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader className="mb-5">
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <div className="space-y-5">
            <Input placeholder="Title" />
            <Textarea placeholder="Description" />
            <DatePicker label="Start of Date" />
            <DatePicker label="End of Date" />
          </div>

          <DialogFooter className="mt-5">
            {buttons.map((button, index) => (
              <Button
                key={index}
                type={button.type || "button"}
                className={button.className}
                onClick={button.onClick}
                variant={button.variant}
              >
                {button.text}
              </Button>
            ))}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyDropdown;
