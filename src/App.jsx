import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Todo from './pages/todo'
import Login from './pages/login'
import Signup from './pages/register'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Todo/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />

      </Routes>
    </Router>
  )
}

export default App
