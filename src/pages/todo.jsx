import { Input } from "@/components/ui/input";
import MainLayout from "@/layouts/MainLayout";
import React, { useEffect, useState } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import Database from "@tauri-apps/plugin-sql";
import { format, isBefore, set } from "date-fns";

const Todo = () => {
  const [position, setPosition] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();
  const {user_id} = location.state|| {};
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [sDate, setSdate] = useState("")
  const [eDate, setEdate] = useState("") 
  const [searchString, setsearchString] = useState("")
  
  const getTodos = async ()=>{
      const db = await Database.load("sqlite:database.db");
      const todoRes = await db.select("SELECT * FROM todo WHERE user_id = $1", [user_id])
      setTodos(todoRes)
  };   

  function getCurrentDateString() {
  return new Date();
  }
  
  const searchBar = async(inputs) => {
    setsearchString(inputs)
    if (inputs !== "") {
      const db = await Database.load("sqlite:database.db");
      const todoRes = await db.select("SELECT * FROM todo WHERE user_id = $1", [user_id])
      const searched = todoRes.filter(todo => todo.title.toLowerCase().includes(inputs.toLowerCase()))
      setTodos(searched)
    }else{
      filter(position)
    }
  }

  const filter = async(pos)=>{
    const db = await Database.load("sqlite:database.db");
    const todoRes = await db.select("SELECT * FROM todo WHERE user_id = $1", [user_id])
    switch (pos) {
    case "All":
      getTodos()
      break;
    case "Pending":{
      const newTodo = todoRes.filter(todo => !todo.is_done );
      setTodos(newTodo)
      break;
    }
    case "Completed":{
      const newTodo = todoRes.filter(todo => todo.is_done );
      setTodos(newTodo)
      break;
    }
    case "Overdue":{
      const currDate = getCurrentDateString()
      const newTodo = todoRes.filter(todo => isBefore(todo.end_date, currDate) && !todo.is_done );
      setTodos(newTodo)
      break;
    }
    default:
      console.log("Invalid status.");
  }

  }

  const logout = async() =>{
    location.state = ""
      navigate('/');
  }

  const todoPlaceholder=(todo)=>{
    console.log(todo)
    setTitle(todo.title)
    setDesc(todo.body)
    setEdate(todo.end_date)
    setSdate(todo.start_date)
  }

  const handleAddTodo = async(e) => {
    console.log("this function is ran")
      e.preventDefault();
      if (!desc) return;
      const db = await Database.load("sqlite:database.db");
      const res = await db.execute("INSERT into todo (title, body, start_date, end_date, is_done, user_id) VALUES ($1, $2, $3, $4, $5, $6)", [title, desc,sDate,eDate, 0, user_id])
      console.log(res)
      getTodos()
      console.log("this is a test on add funcitons")
      console.log(todos)
      setTitle("")
      setDesc("")
      setSdate("")
      setEdate("")
      filter(position)
  };

  const handleUpdateTodo = async(todo) => {
    console.log("this is update function is run")
      if (!desc) return;
      const db = await Database.load("sqlite:database.db");
      await db.execute("UPDATE todo SET title = $1, body = $2, start_date = $3, end_date = $4 where id = $5 ", [title, desc,sDate,eDate, todo])
      getTodos()
      setTitle("")
      setDesc("")
      setSdate("")
      setEdate("")
      filter(position)
  };;

  const handleToggleTodo = async(index, todo_id) => {
      const newTodos = [...todos];
      newTodos[index].is_done = 1 - newTodos[index].is_done;
      const db = await Database.load("sqlite:database.db");
      db.execute("UPDATE todo SET is_done = $1 WHERE id = $2", [newTodos[index].is_done, todo_id])
      getTodos();
      filter(position)
  };
  
  const handleRemoveTodo = async (todo_id) => {
    console.log("this is delete tod debug")
      const db = await Database.load("sqlite:database.db");
      await db.execute("DELETE FROM todo WHERE id = $1", [todo_id])
      getTodos()
      filter(position)
  };
  function truncateString(str, limit = 30) {
    return str.length > limit ? str.slice(0, limit) + "..." : str;
  }
  useEffect(() => {
    getTodos()
  }, [])


  return (
    <>
      <MainLayout width="sm:w-190 font-semibold text-center">
        <h1 className="text-3xl text-center mb-8">Todo List</h1>
        <div className="space-y-5">
          <div className="flex gap-x-10 pb-4">
            <Input placeholder="Search" icon={<FaSearch />} value={searchString} onChange={(e)=> searchBar(e.target.value)} />

            <MyDropdown dialogTitle="Add Task" 
            buttons={[{ text: "Submit", type: "submit"}]} 
            title={title} setTitle={setTitle}
            desc={desc} setDesc={setDesc}
            sDate={sDate} setSdate={setSdate}
            eDate={eDate} setEdate={setEdate}
            onSub={handleAddTodo}>
              <Button type="submit" className="rounded-4xl" size="lg">
                <FaPlus />
              </Button>
            </MyDropdown>
          </div>
          <div className="flex place-items-start">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  {position}
                  <MdKeyboardArrowDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={(val)=>{
                    setPosition(val)
                    filter(val)
                  }}
                >
                  <DropdownMenuRadioItem
                    value="All"
                  >
                    All
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="Completed"
                  >
                    Completed
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="Pending"
                  >
                    Pending
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="Overdue"
                  >
                    Overdue
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <TodoListLayout>
            <div className="grid grid-cols-2 gap-5" >
            {todos.map((todo, index)=>(
              <MyDropdown
                key={index}
                dialogTitle="Full Details"
                buttons={[
                  { text: "Save", clickEvent:()=>handleUpdateTodo(todo.id) },
                  { text: "Delete", variant: "destructive", clickEvent: ()=>handleRemoveTodo(todo.id) },
                  { text: todo.is_done?"Unfinished":"Complete", variant: todo.is_done?"primary":"success", clickEvent: ()=>handleToggleTodo(index, todo.id)},
                ]}
                title={title} setTitle={setTitle}
                desc={desc} setDesc={setDesc}
                sDate={sDate} setSdate={setSdate}
                eDate={eDate} setEdate={setEdate}
              >
                <Button
                  key={index}
                  type="submit"
                  className="rounded-md w-full p-4 flex justify-start items-start h-fit"
                  onClick={()=>todoPlaceholder(todo)}
                >
                  <div className="space-y-4">
                    <h1 className={`flex text-xl 
                    ${todo.is_done == 1 ? 'line-through text-green-500' : 
                    isBefore(new Date(todo.end_date), new Date(getCurrentDateString())) ? 'text-red-500' : ''
                    }`} >
                      <span className="ml-4">{todo.title}</span>
                    </h1>
                    <h1 className="flex text-justify text-wrap">
                      <span className="ml-4">
                        {truncateString(todo.body)}
                      </span>
                    </h1>
                      <span className="ml-4">
                        <br />
                        Due date: {format(todo.end_date, 'MM-dd-yyyy')}
                      </span>

                  </div>
                </Button>
              </MyDropdown>
            ))}
            </div>
          </TodoListLayout>
        </div>
      </MainLayout>
    </>
  );
};

export default Todo;
