import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Todo from './pages/Todo'
import Login from './pages/Login'
import Signup from './pages/Signup'

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
