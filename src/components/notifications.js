import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/notifications.module.css';
import styled from 'styled-components'; 
import { clearNotification } from '../actions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Loader from './loader';

const Overlay = styled.div`
  position: absolute;
  top:0;right:0;left:0;bottom:0;
  transform: ${p => p.active ? "scale(1)": "scale(0)"};
  opacity: ${p => p.active ? "1": "0"};
  transition: opacity 500ms ease-in-out;
  background: rgb(136, 136, 136, 0.3);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Notifications = () => {

  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications);
  const isConnected = useSelector(state => state.isConnected);

  return (
    <Overlay active={notifications.length > 0 || !isConnected}>
      <div className={styles.container}>
        { !isConnected ? <Loader size={20}></Loader>: <i className="fas fa-bug"></i>}
        <div className={styles.messages}>
          {
            !isConnected ? <div className={styles.message}>Connecting to server...</div>:
            <TransitionGroup>
              {notifications.length ? notifications.map((item, idx) => (
                  <CSSTransition timeout={300} classNames="friend-list-item" key={idx}>
                    <div className={styles.message}>
                      {item.msg}
                    </div>
                  </CSSTransition>
                  )
              ): null}
            </TransitionGroup>
          }
        </div>
        { isConnected ? <button className={styles.close} onClick={() => dispatch(clearNotification())}>OK</button>: null }
      </div>
    </Overlay>
  )
}

export default Notifications;