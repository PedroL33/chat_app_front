import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../actions';
import io from 'socket.io-client';
import MainPanel from './mainPanel';

var socket;
 
function Dashboard() {

    const dispatch = useDispatch();

    socket = io('http://localhost:3000', {query: {token: localStorage.getItem('token')}});
    socket.on('connect', () => {
        console.log(`${socket.id} had connected.`)
        socket.emit('get_data')
        socket.emit('new_user')
    })         
    socket.on('error', (error) => {
        if(error === "Invalid token.") {
            socket.disconnect();
            dispatch(logout())
        }
    })

    function signout(e) {
        e.preventDefault()
        dispatch(logout())
        socket.disconnect();
        localStorage.removeItem('token');
    }

    return (
        <div className="w-75 mx-auto">
            <button onClick={e=>signout(e)}>Logout</button>
            <MainPanel />
        </div>
    )
}

export { Dashboard, socket };