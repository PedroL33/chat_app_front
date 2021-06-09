import React, { useState } from 'react';
import { navLogin, navInfo } from '../actions';
import { signup, setSignupErrors, clearSignupErrors } from '../actions/authentication';
import { useDispatch, useSelector } from 'react-redux';

function Signup() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [email, setEmail] = useState("");

    const errorData = useSelector(state => state.signupErrors)

    const errors = {}
    if(errorData.errors) {
        errorData.errors.forEach(item => {
        errors[item.param] = item.msg
        })
    }

    function handleClick(e, action) {
        e.preventDefault(e);
        dispatch(action);
        dispatch(clearSignupErrors())
        setUsername("")
        setPassword("")
        setConfirm("")
        setEmail("")
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(confirm !== password) {
            dispatch(setSignupErrors({
                errors: ["Passwords do not match."]
            }))
        }else {
            dispatch(signup(username, password, email));
        }
    }

    return (
        <div className="form shadow">
            <div className="form-title">Signup</div>
            <label className="form-label">Username:</label>
            {errors.body && <span className="form-error">&nbsp;{errors.body}</span>}
            {errors.username && <span className="form-error">&nbsp;{errors.username}</span>}
            <input className={errors.username ? "form-control mb-2 is-invalid" :"form-control mb-2"} type="text" placeholder="Minimum 4 characters." onChange={e=>setUsername(e.target.value)}></input>
            <label className="form-label">Email:</label>
            {errors.email && <span className="form-error">&nbsp;{errors.email}</span>}
            <input className={errors.email ? "form-control mb-2 is-invalid" :"form-control mb-2"} type="text" placeholder="Email with a valid format." onChange={e=>setEmail(e.target.value)}></input>
            <label className="form-label">Password:</label>
            {errors.password && <span className="form-error">&nbsp;{errors.password}</span>}
            <input className={errors.password ? "form-control mb-2 is-invalid" :"form-control mb-2"} type="password" placeholder="Minimum 6 characters." onChange={e=>setPassword(e.target.value)}></input>
            <label className="form-label">Confirm Password</label>
            <input className="form-control mb-3" type="password" placeholder="Must match password." onChange={e=>setConfirm(e.target.value)}></input>
            <div className="text-center">
                <button className="btn btn-success" onClick={(e) => handleSubmit(e)}>Signup</button>
            </div>
            <div className="form-links">
                <div className="form-link" onClick={(e) => handleClick(e, navInfo())}>About</div>
                <div className="form-link" onClick={(e) => handleClick(e, navLogin())}>Login</div>
            </div>
        </div>
    )
}

export default Signup;