import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setLoginErrors, setCurrentUser } from '../actions';
import io from 'socket.io-client';
import MainPanel from './mainPanel';

var socket;
 
function Dashboard() {

    const dispatch = useDispatch();

    socket = io('http://localhost:3000', {query: {token: localStorage.getItem('token')}});
    
    useEffect(() => {
        socket.on('connect', () => {
            console.log(`${socket.id} had connected.`)
            socket.emit('get_user_data', localStorage.getItem('token'))
            socket.emit('get_request_data', localStorage.getItem('token'))
            socket.emit('get_message_data', localStorage.getItem('token'))
            socket.emit('new_user')
        })  
        socket.on('duplicate_auth', (error) => {
            socket.disconnect();
            localStorage.removeItem('token');
            dispatch(logout());
            dispatch(setLoginErrors({error: error}))
        }) 
        socket.on('invalid_auth', () => {
            socket.disconnect();
            dispatch(logout());
        })      
        socket.on('logged_in', (username) => {
            dispatch(setCurrentUser(username))
        })
        socket.on('error', (error) => {
            if(error === "Invalid token.") {
                socket.disconnect();
                dispatch(logout())
            }
        })
        return function cleanup() {
            socket.off('invalid_auth')
            socket.off('connect')
            socket.off('error')
            socket.off('duplcate_auth')
            socket.off('logged_in')
        }
    })

    return (
        <MainPanel />
    )
}

export { Dashboard, socket };