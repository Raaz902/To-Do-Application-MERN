import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  })
  const collectData = async () => {
    console.log(name, email, password);
    let result = await fetch('http://localhost:8000/register', {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': "application/json"
      },
    });

    result = await result.json();
    console.log(result)
    localStorage.setItem('user', JSON.stringify(result));
    navigate('/');
  }
  return (
    <div className='signUp-Div'>
      <h1>Register</h1>
      <input className='inputBox' type="text" value={name} placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />
      <input className='inputBox' type="email" value={email} placeholder='Enter E-mail' onChange={(e) => setEmail(e.target.value)} />
      <input className='inputBox' type="password" value={password} placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={collectData} className='button' type='button'>Sign Up</button>
    </div>
  )
}
