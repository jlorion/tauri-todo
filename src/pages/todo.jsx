import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import MainLayout from "@/layouts/MainLayout";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MyDropdown from "@/components/custom/MyDropdown";
import TodoListLayout from "@/layouts/TodoListLayout";

const Todo = () => {
  const [position, setPosition] = useState("all");
  return (
    <>
      <MainLayout width="sm:w-190 font-semibold text-center">
        <h1 className="text-3xl text-center mb-8">Todo List</h1>
        <div className="space-y-5">
          <div className="flex gap-x-10 pb-4">
            <Input placeholder="Search" icon={<FaSearch />} />

            <MyDropdown dialogTitle="Add Task" buttons={[{ text: "Submit" }]}>
              <Button type="submit" className="rounded-4xl" size="lg">
                <FaPlus />
              </Button>
            </MyDropdown>
          </div>

          <div className="flex place-items-start">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  Status
                  <MdKeyboardArrowDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  <DropdownMenuRadioItem
                    onSelect={() => console.log("all")}
                    value="all"
                  >
                    All
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    onSelect={() => console.log("completed")}
                    value="completed"
                  >
                    Completed
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    onSelect={() => console.log("pending")}
                    value="pending"
                  >
                    Pending
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    onSelect={() => console.log("overdue")}
                    value="overdue"
                  >
                    Overdue
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <TodoListLayout>
            <div className="grid grid-cols-2 gap-5">
              <MyDropdown
                dialogTitle="Full Details"
                buttons={[
                  { text: "Save" },
                  { text: "Delete", variant: "destructive" },
                  { text: "Complete", variant: "success" },
                ]}
              >
                <Button
                  type="submit"
                  className="rounded-md w-full p-4 flex justify-start items-start h-fit"
                >
                  <div className="space-y-4">
                    <h1 className="flex text-xl">
                      {"Title:"} <span className="ml-4">{"Kupal mode"}</span>
                    </h1>
                    <h1 className="flex text-justify text-wrap">
                      {"Description:"}{" "}
                      <span className="ml-4">
                        {
                          "Pwede magtanong? Ganyan ho ba ang boses ng mga nagtatanong maem?? pag limit og words dri boy na mga let's say 10 words pag mo reach na ana kay mag ellipsis na sya..."
                        }
                      </span>
                    </h1>
                  </div>
                </Button>
              </MyDropdown>
              <MyDropdown
                dialogTitle="Full Details"
                buttons={[
                  { text: "Save" },
                  { text: "Delete", variant: "destructive" },
                  { text: "Complete", variant: "success" },
                ]}
              >
                <Button
                  type="submit"
                  className="rounded-md w-full p-4 flex justify-start items-start h-fit"
                >
                  <div className="space-y-4">
                    <h1 className="flex text-xl">
                      {"Title:"} <span className="ml-4">{"Kupal mode"}</span>
                    </h1>
                    <h1 className="flex text-justify text-wrap">
                      {"Description:"}{" "}
                      <span className="ml-4">
                        {
                          "Pwede magtanong? Ganyan ho ba ang boses ng mga nagtatanong maem?? pag limit og words dri boy na mga let's say 10 words pag mo reach na ana kay mag ellipsis na sya..."
                        }
                      </span>
                    </h1>
                  </div>
                </Button>
              </MyDropdown>
              <MyDropdown
                dialogTitle="Full Details"
                buttons={[
                  { text: "Save" },
                  { text: "Delete", variant: "destructive" },
                  { text: "Complete", variant: "success" },
                ]}
              >
                <Button
                  type="submit"
                  className="rounded-md w-full p-4 flex justify-start items-start h-fit"
                >
                  <div className="space-y-4">
                    <h1 className="flex text-xl">
                      {"Title:"} <span className="ml-4">{"Kupal mode"}</span>
                    </h1>
                    <h1 className="flex text-justify text-wrap">
                      {"Description:"}{" "}
                      <span className="ml-4">
                        {
                          "Pwede magtanong? Ganyan ho ba ang boses ng mga nagtatanong maem?? pag limit og words dri boy na mga let's say 10 words pag mo reach na ana kay mag ellipsis na sya..."
                        }
                      </span>
                    </h1>
                  </div>
                </Button>
              </MyDropdown>
              <MyDropdown
                dialogTitle="Full Details"
                buttons={[
                  { text: "Save" },
                  { text: "Delete", variant: "destructive" },
                  { text: "Complete", variant: "success" },
                ]}
              >
                <Button
                  type="submit"
                  className="rounded-md w-full p-4 flex justify-start items-start h-fit"
                >
                  <div className="space-y-4">
                    <h1 className="flex text-xl">
                      {"Title:"} <span className="ml-4">{"Kupal mode"}</span>
                    </h1>
                    <h1 className="flex text-justify text-wrap">
                      {"Description:"}{" "}
                      <span className="ml-4">
                        {
                          "Pwede magtanong? Ganyan ho ba ang boses ng mga nagtatanong maem?? pag limit og words dri boy na mga let's say 10 words pag mo reach na ana kay mag ellipsis na sya..."
                        }
                      </span>
                    </h1>
                  </div>
                </Button>
              </MyDropdown>
            </div>
          </TodoListLayout>
        </div>
      </MainLayout>
    </>
  );
};

export default Todo;
