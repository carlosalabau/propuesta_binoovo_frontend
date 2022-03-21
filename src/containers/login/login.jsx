import React, { useEffect, useState } from 'react'
import { Button, Pane, Text, majorScale, TextInputField } from 'evergreen-ui'
import { useNavigate } from "react-router-dom"
import './login.css';
const axios = require('axios').default;

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    async function login() {
        const user = {
            email: email,
            password: pass
        }
        await axios.post('http://localhost:5000/login', user).then((result) => {
            localStorage.setItem('token', result.data.token)
            localStorage.setItem('user', JSON.stringify(result.data.user))
            navigate('/home')
        })

    }

    return (
        <main>
            <form className='formLogin'>
                <TextInputField
                    className='inputLogin'
                    label="Email"
                    placeholder="Introduce tu email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextInputField
                    type="password"
                    className='inputLogin'
                    label="Contraseña"
                    placeholder="Introduce tu contraseña"
                    onChange={(e) => setPass(e.target.value)}
                />
                <Button type="button" appearance="primary" onClick={login}>Login</Button>
            </form>
        </main>
    )

}

export default Login;