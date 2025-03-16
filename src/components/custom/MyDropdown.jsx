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
import { useState } from "react";

const MyDropdown = ({
  dialogTitle,
  children,
  buttons = [],
  title, 
  setTitle, 
  desc,
  setDesc,
  sDate,
  setSdate,
  eDate,
  setEdate,
  onSub, 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle dialog close event
  const handleDialogChange = (open) => {
    setIsOpen(open);
    if (!open) {
      setTitle("")
      setDesc("")
      setEdate("")
      setSdate("")
    }
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleDialogChange}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader className="mb-5">
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e)=>{
            onSub(e)
            setIsOpen(false)
          }}>
          <div className="space-y-5">
            <Input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
            <Textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" />
            <DatePicker date={sDate} setDate={setSdate} label="Start of Date" placeholder="date" />
            <DatePicker date={eDate} setDate={setEdate} label="End of Date" placeholder="date"/>
          </div>
          <DialogFooter  className="mt-5">
            {buttons.map((button, index) => (
              <Button
                key={index}
                type={button.type || "button"}
                className={button.className}
                onClick={()=>{
                  button.clickEvent()
                  setIsOpen(false)
                }}
                variant={button.variant}
              >
                {button.text}
              </Button>
            ))}
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyDropdown;
