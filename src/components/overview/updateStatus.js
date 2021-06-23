import React from 'react';
import { socket } from '../dashboard';
import { useSelector } from 'react-redux';
import styles from '../../styles/overview.module.css';

const UpdateStatus = (props) => {

  const currentUser = useSelector(state => state.currentUser)

  function handleClick() {
    socket.emit("update_status", props.status, localStorage.getItem('token'))
  }

  return (
    <div class="modal fade" id="update-status" tabIndex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className={styles.content}>
              <button type="button" className={styles.content__close} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <div className={styles.content__body}>
                  <span>I am </span>
                  <input value={props.status} className={styles.content__input} type="text" onChange={(e)=> props.setStatus(e.target.value)} placeholder={currentUser.status}></input>
              </div>
              <button onClick={() => handleClick()} data-dismiss="modal" type="button" className={styles.content__button}>Update</button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default UpdateStatus;