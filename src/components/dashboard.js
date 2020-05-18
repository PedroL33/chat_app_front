import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { userLogout, navLogin, setLoginErrors, setCurrentUser, addEvent } from '../actions';
import io from 'socket.io-client';
import MainPanel from './mainPanel';

var socket;
 
function Dashboard() {

    const dispatch = useDispatch();

    socket = io('https://intense-journey-99404.herokuapp.com/', {query: {token: localStorage.getItem('token')}});
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
            dispatch(userLogout());
            dispatch(navLogin())
            dispatch(setLoginErrors({error: error}))
        }) 
        socket.on('invalid_auth', () => {
            socket.disconnect();
            dispatch(userLogout());
        })      
        socket.on('current_user_data', (data) => {
            dispatch(setCurrentUser(data))
        })
        socket.on('update_complete', (data) => {
            socket.emit('get_current_user')
            socket.emit('broadcast_update', data)
        })
        socket.on('timeline_update', (data) => {
            dispatch(addEvent(data))
        })
        socket.on('error', (error) => {
            if(error === "Invalid token.") {
                socket.disconnect();
                dispatch(userLogout())
            }
        })
        return function cleanup() {
            socket.off('invalid_auth')
            socket.off('connect')
            socket.off('error')
            socket.off('duplcate_auth')
            socket.off('logged_in')
            socket.off('update_complete')
            socket.off('timeline_update')
            socket.off('current_user_data')
        }
    })

    return (
        <MainPanel />
    )
}

export { Dashboard, socket };