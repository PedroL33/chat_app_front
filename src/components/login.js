import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navInfo, navSignup, loginSuccess, setLoginErrors } from '../actions/index';

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const errors = useSelector(state => state.loginErrors)

    function login(e) {
        e.preventDefault();
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                username: username, 
                password: password
            })
        })
        .then( results => results.json())
        .then( data => {
            if(data.token) {
                localStorage.setItem('token', data.token)
                dispatch(loginSuccess());
            }else {
                dispatch(setLoginErrors(data))
            }
        })
        .catch(err => {
            dispatch(setLoginErrors(err))
        })
    }

    function handleClick(e, action) {
        e.preventDefault();
        dispatch(action);
    }

    return (
        <div>
            <input type="text" onChange={e => setUsername(e.target.value)} placeholder="Username"></input>
            <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password"></input>
            <span>{errors['error'] && errors['error']}</span>
            <button onClick={e => login(e)}>Login</button>
            <button onClick={e => handleClick(e, navInfo())}>Info</button>
            <button onClick={e => handleClick(e, navSignup())}>Signup</button>
        </div>
    )
}

export default Login;