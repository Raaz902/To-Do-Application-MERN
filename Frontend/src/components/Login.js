import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    })

    const collectData = async () => {
        console.log(email, password);
        let result = await fetch('http://localhost:8000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': "application/json"
            },
        });

        result = await result.json();

        if (result.name) {
            console.log("Result")
            console.log(result)
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/');
        } else if (result.msg) {
            alert("Enter corret details")
        }
    }
    return (
        <div className='signUp-Div'>
            <h1>Login</h1>
            <input className='inputBox' type="email" value={email} placeholder='Enter E-mail' onChange={(e) => setEmail(e.target.value)} />
            <input className='inputBox' type="password" value={password} placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={collectData} className='button' type='button'>Login</button>
        </div>
    )
}
