import {useState, useEffect} from 'react'

function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const registerUser = (e) => {
    e.preventDefault();
    console.log("Name", name)
  }

  return (
    <>
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
        <label>Confirm Password</label>
        <input 
          value={confirmPassword} 
          type="password"
          onChange={ (e) => setConfirmPassword(e.target.value) }
        />
        <button type="submit" className="button">Register</button>

      </form>
    </>
  )
}

export default Register