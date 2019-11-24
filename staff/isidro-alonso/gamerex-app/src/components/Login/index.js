import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import {authenticateUser} from '../../logic'

export default function({  }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin =async (e)=>{
        e.preventDefault();
        try {
            const token = await authenticateUser(username, password)
            sessionStorage.token = token
          
        } catch (error) {
            console.error(error)
        }
    }
    const isDisabled = !username || !password

    return <section className="login">
    <form onSubmit={handleLogin}>
        <h1 className="login__title">Login</h1>
        <input className="login__field" type="text" name="username" placeholder="username" onChange={({target})=>setUsername(target.value)}/>
        <input className="login__field" type="password" name="password" placeholder="password" onChange={({target})=>setPassword(target.value)}/>
        <button className="login__submit" disabled={isDisabled}>Login</button>
        <p className="login__gotoregister">Are you not registered?<br />
            <Link to='/register'>
                Sign up now!
            </Link>
        </p>
    </form>
</section>
}