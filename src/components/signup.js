import React, { useState } from 'react';
import { navLogin, navInfo, loginSuccess, setSignupErrors } from '../actions';
import { useDispatch } from 'react-redux';

function Signup() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [email, setEmail] = useState("");

    function handleClick(e, action) {
        e.preventDefault(e);
        dispatch(action);
    }

    function signup(e) {
        e.preventDefault()
        if(confirm !== password) {
            dispatch(setSignupErrors({
                errors: ["Passwords do not match."]
            }))
        }else {
            fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email
                })
            })
            .then(results => results.json())
            .then(data => {
                if(data.token) {
                    localStorage.setItem('token', data.token)
                    dispatch(loginSuccess())
                }else {
                    dispatch(setSignupErrors(data))
                }
            })
            .catch(errors => dispatch(setSignupErrors(errors)))
        }
    }

    return (
        <div>
            Signup
            <input type="text" placeholder="Username" onChange={e=>setUsername(e.target.value)}></input>
            <input type="text" placeholder="Email" onChange={e=>setEmail(e.target.value)}></input>
            <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}></input>
            <input type="password" placeholder="Confirm" onChange={e=>setConfirm(e.target.value)}></input>
            {/* <div>{error}</div> */}
            <button onClick={e => signup(e)}>Signup</button>
            <button onClick={e => handleClick(e, navLogin())}>Login</button>
            <button onClick={e => handleClick(e, navInfo())}>Info</button>
        </div>
    )
}

export default Signup;