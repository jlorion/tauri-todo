import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';



const Todo = () => {
    const navigate = useNavigate();
    
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const getTodos = async ()=>{
        console.log("hellow")
    };   

    const logout = async() =>{
        navigate('/login');
    }

    const handleAddTodo = async(e) => {
        e.preventDefault();
        if (!inputValue) return;

        
        setInputValue('');
    };

    const handleToggleTodo = async(index) => {
        const newTodos = [...todos];
        newTodos[index].done = !newTodos[index].done;
        setTodos(newTodos);
    };

    const handleRemoveTodo = async (index) => {
        console.log(todos[index].id)

        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
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
                    <li key={index} className={`flex items-center p-2 rounded-md m-1 justify-between ${todo.done ? 'line-through text-gray-500 bg-neutral-300' : ''}`}>
                        <span onClick={() => handleToggleTodo(index)} className="cursor-pointer">{todo.content}</span>
                        <button onClick={() => handleRemoveTodo(index)} className="text-red-500 hover:text-red-700">
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
   

};

export default Todo;