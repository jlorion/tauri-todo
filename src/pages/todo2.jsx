

import Database from '@tauri-apps/plugin-sql';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';



const Todo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {user_id} = location.state|| {};
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const getTodos = async ()=>{
        const db = await Database.load("sqlite:database.db");
        const todoRes = await db.select("SELECT * FROM todo WHERE user_id = $1", [user_id])
        setTodos(todoRes)
    };   

    const logout = async() =>{
        navigate('/');
    }

    const handleAddTodo = async(e) => {
        e.preventDefault();
        if (!inputValue) return;
        const db = await Database.load("sqlite:database.db");
        db.execute("INSERT into todo (todo, isDone, user_id) VALUES ($1, $2, $3)", [inputValue, 0, user_id])
        getTodos()
        console.log("this is where add todos is")
        console.log(todos)
        setInputValue('');
    };

    const handleToggleTodo = async(index, todo_id) => {
        const newTodos = [...todos];
        newTodos[index].isDone = 1 - newTodos[index].isDone;
        const db = await Database.load("sqlite:database.db");
        db.execute("UPDATE todo SET isDone = $1 WHERE id = $2", [newTodos[index].isDone, todo_id])
        getTodos();
    };
    
    const handleRemoveTodo = async (todo_id) => {
        const db = await Database.load("sqlite:database.db");
        db.execute("DELETE FROM todo WHERE id = $1", [todo_id])
        getTodos()
    };
    useEffect(() => {
        getTodos();
    }, [])

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
            <button onClick={()=>logout()} className='bg-red-500 p-2 rounded-md text-white hover:bg-red-400'>Log out</button>
            <h2 className="text-2xl font-bold mb-4 text-center">Todo List</h2>
            <form onSubmit={handleAddTodo} className="flex mb-4">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a new task"
                    className="flex-grow p-2 border border-gray-300 rounded-md"
                />
                <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400">
                    Add
                </button>
            </form>
            <ul className="space-y-2">
                {todos.map((todo, index) => (
                    <li key={index} className={`flex items-center p-2 rounded-md m-1 justify-between ${todo.isDone==1? 'line-through text-gray-500 bg-neutral-300' : ''}`}>
                        <span onClick={() => handleToggleTodo(index, todo.id)} className="cursor-pointer">{todo.todo}</span>
                        <button onClick={() => handleRemoveTodo(todo.id)} className="text-red-500 hover:text-red-700">
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
   

};

export default Todo;