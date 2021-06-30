import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import styles from '../../styles/chatPanel.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeConversation, bringToFront } from '../../actions';
import ChatDisplay from './chatDisplay';

const Container = styled.div.attrs(p => ({
  style: {
    width: p.width < 300 ? "300px": `${p.width}px`, 
    height: p.height < 400 ? "400px": `${p.height}px`,
    top: `${p.top}px`,
    left: `${p.left}px`,
  }
}))`
  background: green;
  position: absolute;
  transition: all 1ms ease;
  border-radius: 15px;
  z-index: 1;
  box-shadow: 0 0 10px grey;
`;

const ChatPanel = (props) => {

  const dispatch = useDispatch(); 
  const [top, setTop] = useState((window.innerHeight/2) - 100);
  const [left, setLeft] = useState((window.innerWidth/2) - 100);
  const [isDraggingHeader, setIsDraggingHeader] = useState(false);
  const [isDraggingResize, setIsDraggingResize] = useState(false);
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(400);
  const headerRef = useRef(null);
  const resizeRef = useRef(null);

  const friendData = useSelector(state => state.friendData);

  useEffect(() => {
    window.addEventListener('mousemove', dragging);
    window.addEventListener('mouseup', dragEnd);

    return () => {
      window.removeEventListener('mousemove', dragging);
      window.removeEventListener('mouseup', dragEnd);
    }
  })

  const dragStart = (e) => {
    setXOffset(e.screenX - e.currentTarget.getBoundingClientRect().left);
    setYOffset(e.screenY - e.currentTarget.getBoundingClientRect().top);
    if(e.currentTarget === headerRef.current) {
      setIsDraggingHeader(true);
    }else if(e.currentTarget === resizeRef.current) {
      setIsDraggingResize(true)
    }
  }

  const dragging = (e) => {
    if(isDraggingHeader) {
      setTop(e.screenY - yOffset);
      setLeft(e.screenX - xOffset);
    }else if(isDraggingResize) {
      setHeight(e.clientY - headerRef.current.getBoundingClientRect().top);
      setWidth(e.clientX - headerRef.current.getBoundingClientRect().left);
    }
  }

  const dragEnd = () => {
    setIsDraggingResize(false);
    setIsDraggingHeader(false);
  }

  return (
    <Container top={top} left={left} width={width} height={height}>
      <div className={styles.content} onMouseDown={() => dispatch(bringToFront(props.friend))}>
        <div className={styles.content__header} onMouseDown={dragStart} ref={headerRef}> 
          <div className={styles.content__username}>{props.friend}</div>
          <div className={styles.content__close} onClick={() => dispatch(closeConversation(props.friend))}><i className="fas fa-times"></i></div>
        </div>
        <div className={styles.content__resize} ref={resizeRef} onMouseDown={dragStart}></div>
        <ChatDisplay friend={props.friend} />
      </div>
    </Container>
  )
}

export default ChatPanel;