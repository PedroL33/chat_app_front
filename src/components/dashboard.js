import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout, navLogin, setCurrentUser, addEvent, addNotification, setIsConnected, setIsNotConnected } from '../actions';
import { setLoginErrors } from '../actions/authentication';
import MainPanel from './mainPanel';
import io from 'socket.io-client';

var socket; 

const Dashboard = () => {

  socket = io.connect('http://localhost:3000', {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd"
    },
    forceNew: true,
    query: { token: localStorage.getItem('token') }
  })

    const dispatch = useDispatch();
    
    useEffect(() => {
        socket.on('connect', () => {
            dispatch(setIsConnected());
            console.log(`${socket.id} has connected.`)
            socket.emit('get_user_data', localStorage.getItem('token'))
            socket.emit('get_request_data', localStorage.getItem('token'))
            socket.emit('get_message_data', localStorage.getItem('token'))
        }) 
        socket.on('connect_error', () => {
          dispatch(setIsNotConnected())
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
            socket.emit('get_current_user', localStorage.getItem('token'))
            socket.emit('broadcast_update', data, localStorage.getItem('token'))
        })
        socket.on('timeline_update', (data) => {
            dispatch(addEvent(data))
        })
        socket.on('server_error', (notification) => {
            dispatch(addNotification(notification));
        })
        return () => {
            socket.off('invalid_auth')
            socket.off('connection')
            socket.off('notification')
            socket.off('duplcate_auth')
            socket.off('logged_in')
            socket.off('update_complete')
            socket.off('timeline_update')
            socket.off('current_user_data')
            socket.off('connect_error')
        }
    }, [socket])

    return (
        <MainPanel />
    )
}

export {Dashboard, socket};