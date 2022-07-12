import { React, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterUser = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const url = 'https://drf-todo-1.herokuapp.com/'


    const handleSubmit = (e) => {
        const data = new FormData()
        data.append('username', name)
        data.append('email', email)
        data.append('password', password)
        axios.post(url + 'register/', data,)
            .then(response => {
                setMessage(response.data.message)
                navigate("/login", { replace: true })
            })
            .catch(error => {
                setMessage(error.response.data.message)
            })
        e.preventDefault()
        setName('')
        setEmail('')
        setPassword('')


    }


    return (
        <div>
            <header><h2>Register User</h2></header>
            <form className='register-form' onSubmit={handleSubmit}>
                <input className="form-input" type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <input className="form-input" type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input className="form-input" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                <button className="submit-button" type="submit">Create</button>
                <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
        </div>
    )
}

export default RegisterUser;