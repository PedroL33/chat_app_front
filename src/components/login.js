import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navInfo, navSignup, clearLoginErrors } from '../actions';
import { login } from '../actions/authentication';


function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const errors = useSelector(state => state.loginErrors)

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(login(username, password))
    }

    function handleClick(e, action) {
        e.preventDefault();
        dispatch(action);
        dispatch(clearLoginErrors())
        setUsername("")
        setPassword("")
    }

    return (
        <div className="form shadow">
            <div className="form-title">Login</div>
            <div className="form-links">
                <div className="form-link" onClick={e => handleClick(e, navInfo())}>About</div>
                <div className="form-link" onClick={e => handleClick(e, navSignup())}>Signup</div>
            </div>
            <span className="form-error">{errors['error'] && errors['error']}</span>
            <input className={errors.error ? "form-control my-3 is-invalid": "form-control my-3"} type="text" onChange={e => setUsername(e.target.value)} placeholder="Username"></input>
            <input className={errors.error ? "form-control my-3 is-invalid": "form-control my-3"} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password"></input>
            <div className="text-center">
                <button className="btn btn-primary" onClick={e => handleSubmit(e)}>Login</button>
            </div>
        </div>
    )
}

export default Login;