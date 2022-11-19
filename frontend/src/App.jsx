import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

function App_old() {
  const [count, setCount] = useState(0)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const registerUser = (e) => {
    e.preventdefault();
    console.log("Name", name)
  }

  return (
    <div className="App">
      <h1>Register</h1>

      <form onSubmit={registerUser}>
        <label>Name</label>
        <input 
          value={name} 
          type="text"
          onChange={ (e) => setName(e.target.value) }
        />
        <label>Email</label>
        <input 
          value={email} 
          type="email"
          onChange={ (e) => setEmail(e.target.value) }
        />
        <label>Password</label>
        <input 
          value={password} 
          type="password"
          onChange={ (e) => setPassword(e.target.value) }
        />
        <button type="submit" className="button">Register</button>

      </form>
    </div>
  )
}

export default App
