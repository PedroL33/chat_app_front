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
        <div className="info" style={{backgroundImage: `url(https://chatbucket11.s3-us-west-2.amazonaws.com/bucketFolder/front-page.jpg)`}}>
            <div className="text-center">
                <h1 className="main-title">Welcome to Chat App</h1>
                <p>A simple place to connect with your friends.</p>
                <hr />
                <div className="info-buttons">
                    <button className="btn btn-success" onClick={e => handleClick(e, navLogin())}>Login</button>
                    <button className="btn btn-primary" onClick={e => handleClick(e, navSignup())}>Signup</button>
                </div>
            </div>
        </div>
    )
}

export default Info;