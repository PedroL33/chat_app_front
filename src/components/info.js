import React from 'react';
import { navLogin, navSignup } from '../actions';
import { useDispatch } from 'react-redux';

function Info() {

    const dispatch = useDispatch();

    function handleClick(e, action) {
        e.preventDefault()
        dispatch(action);
    }

    return (
        <div>
            Info
            <button onClick={e => handleClick(e, navLogin())}>Login</button>
            <button onClick={e => handleClick(e, navSignup())}>Signup</button>
        </div>
    )
}

export default Info;