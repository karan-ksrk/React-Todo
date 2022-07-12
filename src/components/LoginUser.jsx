import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginUser = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const url = "https://drf-todo-1.herokuapp.com/"

    useEffect(() => {
        console.log("ERROR", message)
    }, [message])

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('username', username)
        data.append('password', password)
        axios.post(url + 'login/', data,)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                navigate("/", { replace: true })
            })
            .catch(error => {
                setMessage(error.message)
                setTimeout(() => {
                    setMessage('')
                }, 1000)
            })
        setUsername('')
        setPassword('')



    }

    return (
        <div>
            <header><h2>Login User</h2></header>
            <form className='register-form' onSubmit={handleSubmit}>
                <input className="form-input" type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input className="form-input" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                <button className="submit-button" type="submit">Login</button>
                <button onClick={() => {
                    navigate("/register", { replace: true })
                }} className='register-button'>Register</button>
                <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
        </div>
    )
}

export default LoginUser