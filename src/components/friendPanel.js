import React, { useEffect } from 'react';
import Friendslist from './friendslist';
import Friendsadd from './friendsadd';
import { useSelector } from 'react-redux';
import { setFriendData, setRequestData, setMessageData, setUnreadData } from '../actions';
import { socket } from './dashboard';
import { useDispatch } from 'react-redux';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

function FriendPanel() {
    const dispatch = useDispatch()
    const conversationUser = useSelector(state => state.currentConversation)
    const currentUser = useSelector(state => state.currentUser)

    useEffect(() => {
        socket.on('user_data', friends => {
            dispatch(setFriendData(friends))
        })
        socket.on('request_data', requests => {
            dispatch(setRequestData(requests))
        })
        socket.on('message_data', (data) => {
            var unreadData = {};
            data.forEach(item => {
                if(item.to === currentUser && !item.read) {
                    if(unreadData[item.from]) {
                        unreadData[item.from] = unreadData[item.from] + 1;
                    }else {
                        unreadData[item.from] = 1;
                    }
                }
            })
            dispatch(setUnreadData(unreadData))
            dispatch(setMessageData(data))
        })
        socket.on('request_update', () => {
            socket.emit('get_request_data', localStorage.getItem('token'))
        })
        socket.on('friend_update', () => {
            socket.emit('get_user_data', localStorage.getItem('token'))
        })
        socket.on('message_update', (from) => {
            if(from === conversationUser) {
                socket.emit('mark_read', from)
            }else {
                socket.emit('get_message_data', localStorage.getItem('token'))
            }
        })
        return function cleanup() {
            socket.off('user_data')
            socket.off('request_data')
            socket.off('message_data')
            socket.off('request_update')
            socket.off('friend_update')
            socket.off('message_update')
        }
    })

    var nav = useSelector(state => state.friendPanel) 

    return (
        <div className="position-realtive friend-panel overflow-hidden">
            <SwitchTransition mode='out-in'>
                <CSSTransition key={nav} timeout={300} classNames='friend-panel-item'>
                    { nav ==="add" ?  <Friendsadd /> : <Friendslist /> } 
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
}

export default FriendPanel;