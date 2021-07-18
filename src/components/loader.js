import React from 'react';
import styled, { keyframes } from 'styled-components';

const Move = (size) => keyframes`
  from{
    transform: translateX(0px);
  }
  to{
    transform: translateX(${size * 3}px);
  }
`

const Fade = keyframes`
  from{
    transform: scale(0, 0);
    opacity: 0;
  }
  to{
    transform: sclae(1, 1);
    opacity: 1;
  }
`

const Dot = styled.div`
  width: ${p => p.size}px; 
  height: ${p => p.size}px;
  border-radius: 50%;
  background: rgb(255,153,102);
  margin-right: ${p => p.size * 2}px;
  animation: ${p => Move(p.size)} 1000ms linear 0ms infinite;
  &:first-child {
    position: absolute;
    top: 0;
    left: 0; 
    animation: ${Fade} 1000ms linear 0ms infinite;
  }
  &:last-child {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 0;
    animation: ${Fade} 1000ms linear 0ms infinite reverse;
  }
`
 
const Loader = (props) => {

  const containerStyles = {
    display: "flex",
    position: "relative",
    width: `${props.size * 7}px`
  }

  return (
    <div style={containerStyles}>
      <Dot size={props.size}></Dot>
      <Dot size={props.size}></Dot>
      <Dot size={props.size}></Dot>
      <Dot size={props.size}></Dot>
    </div>
  )
}

export default Loader;