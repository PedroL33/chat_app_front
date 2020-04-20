import React, { useEffect } from 'react';
import Friendslist from './friendslist';
import Friendsadd from './friendsadd';
import { useSelector } from 'react-redux';
import { setFriendData, newOnlineFriend, newOfflineFriend, newRequest, removeRequest } from '../actions';
import { socket } from './dashboard';
import { useDispatch } from 'react-redux';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

function FriendPanel() {
    const dispatch = useDispatch()

    useEffect(() => {
        socket.on('data', friends => {
            dispatch(setFriendData(friends))
        })
        socket.on('new_request', request => {
            dispatch(newRequest(request))
        })
        
        socket.on('remove_request', request => {
            dispatch(removeRequest(request))
        })
        socket.on('new_online_friend', (friend) => {
            dispatch(newOnlineFriend(friend))
        })
        socket.on('new_offline_friend', (friend) => {
            dispatch(newOfflineFriend(friend))
        }) 
        return function cleanup() {
            socket.off('new_request')
            socket.off('remove_request')
            socket.off('new_online_friend')
            socket.off('new_offline_friend')
            socket.off('data');
        }
    })

    var nav = useSelector(state => state.friendPanel) 

    return (
        <div className="position-realtive overflow-hidden w-25 mx-auto">
            <SwitchTransition mode='out-in'>
                <CSSTransition key={nav} timeout={300} classNames='friend-panel-item'>
                    { nav ==="add" ?  <Friendsadd /> : <Friendslist /> } 
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
}

export default FriendPanel;