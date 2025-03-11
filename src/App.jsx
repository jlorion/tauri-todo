import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddTask from "./pages/AddTask";
import Completed from "./pages/Completed";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/addtask" element={<AddTask />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
