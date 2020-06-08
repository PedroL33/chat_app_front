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
        <div className="info">
            <div className="info-welcome">
                <h1 className="main-title">Welcome to Chat App</h1>
                <p>Connect with your friends in real time.</p>
                <hr />
                <div className="info-buttons">
                    <button className="landing-button" onClick={e => handleClick(e, navLogin())}>Login</button>
                    <button className="landing-button" onClick={e => handleClick(e, navSignup())}>Signup</button>
                </div>
            </div>
            <div class="info-side" style={{backgroundImage: `url(${window.location}images/background.jpg)`}}>

            </div>
        </div>
    )
}

export default Info;