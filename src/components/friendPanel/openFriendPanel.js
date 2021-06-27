import React from 'react';
import styles from '../../styles/friendPanel.module.css';
import { useDispatch } from 'react-redux';
import { toggleFriendPanel } from '../../actions';
import FriendPanel from './friendPanel';

const OpenFriendPanel = () => {

  const dispatch = useDispatch();

  return (
    <div className={styles.openContainer}>
      <button className={styles.open} onClick={()=>dispatch(toggleFriendPanel())}>
        <i className="far fa-comment"></i>
      </button>
      <FriendPanel />
    </div>
  )
}

export default OpenFriendPanel;