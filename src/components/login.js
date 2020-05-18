import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navInfo, navSignup, loginSuccess, setLoginErrors, clearLoginErrors } from '../actions/index';


function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const errors = useSelector(state => state.loginErrors)
    //https://intense-journey-99404.herokuapp.com/login
    function login(e) {
        e.preventDefault();
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                username: username.trim(), 
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
        dispatch(clearLoginErrors())
        setUsername("")
        setPassword("")
    }

    return (
        <div className="form">
            <div className="form-title">Login</div>
            <div className="form-links">
                <div className="form-link" onClick={e => handleClick(e, navInfo())}>About</div>
                <div className="form-link" onClick={e => handleClick(e, navSignup())}>Signup</div>
            </div>
            <span className="form-error">{errors['error'] && errors['error']}</span>
            <input className={errors.error ? "form-control my-3 is-invalid": "form-control my-3"} type="text" onChange={e => setUsername(e.target.value)} placeholder="Username"></input>
            <input className={errors.error ? "form-control my-3 is-invalid": "form-control my-3"} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password"></input>
            <div className="text-center">
                <button className="btn btn-primary" onClick={e => login(e)}>Login</button>
            </div>
        </div>
    )
}

export default Login;