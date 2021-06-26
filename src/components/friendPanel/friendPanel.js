import React, { useEffect, useState } from 'react';
import Friendslist from './friendslist';
import Friendsadd from './friendsadd';
import { useSelector } from 'react-redux';
import { setFriendData, setRequestData, setMessageData, setUnreadData, setIsTyping, setNotTyping } from '../../actions';
import { socket } from '../dashboard';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import styles from '../../styles/friendPanel.module.css';

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: ${p => p.open ? `0`: `-300px`};
  width: 300px;
  background: white;
  transition: right 300ms ease;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${p => p.active===0 ? "0px": `-${p.active*300}px`};
  display: flex;
  transition: all 500ms ease-in-out;
`

const Tab = styled.div`
  flex: 1;
  height: 50px;
  display: flex; 
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  font-size: ${p => p.active ? "24px": "16px"};
  transition: all 300ms ease-in-out;
  position: relative;
  &:after {
    content: '';
    border-bottom: ${p => p.active ? "5px solid green": "none"};
    width: ${p => p.active ? "50%": "0px"};
    margin: 0 auto;
    position: absolute;
    bottom: 5px;
    transition: width 300ms ease-in-out;
  }
`

const FriendPanel = () => {
    const dispatch = useDispatch()
    const conversationUser = useSelector(state => state.currentConversation)
    const currentUser = useSelector(state => state.currentUser)
    const showConversation = useSelector(state => state.showConversation)
    const open = useSelector(state => state.openFriendPanel)
    const [active, setActive] = useState(0);

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
                if(item.to === currentUser.username && !item.read) {
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
            if(from === conversationUser && showConversation) {
                socket.emit('mark_read', from)
            }else {
                socket.emit('get_message_data', localStorage.getItem('token'))
            }
        })
        socket.on('friend_is_typing', (friend) => {
            dispatch(setIsTyping(friend))
        })
        socket.on('friend_stopped_typing', (friend) => {
            dispatch(setNotTyping(friend))
        })
        return function cleanup() {
            socket.off('user_data')
            socket.off('request_data')
            socket.off('message_data')
            socket.off('request_update')
            socket.off('friend_update')
            socket.off('message_update')
            socket.off('friend_is_typing')
            socket.off('friend_stopped_typing')
        }
    })

    const nav = useSelector(state => state.friendPanel) 

    return (
        <Container open={open}>
          <div className={styles.header}>
            <i className="far fa-comment-dots"></i>
          </div>
          <div className={styles.nav}>
            <Tab active={active===0} onClick={()=>setActive(0)}>
              <i class="fas fa-home"></i>
            </Tab>
            <Tab active={active===1} onClick={()=>setActive(1)}>
              <i class="far fa-comment"></i>
            </Tab>
            <Tab active={active===2} onClick={()=>setActive(2)}>
              <i class="fas fa-plus"></i>
            </Tab>
          </div>
          <div className={styles.content}>
            <Content active={active}>
              <Friendslist />
              <Friendsadd />
            </Content>  
          </div>
        </Container>
    )
}

export default FriendPanel;