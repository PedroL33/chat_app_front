import React, { useState, useRef, useEffect } from 'react';
import { socket } from '../../dashboard';
import { useSelector } from 'react-redux';
import styles from '../../../styles/overview.module.css';

const UpdateStatus = () => {

  const currentUser = useSelector(state => state.currentUser)
  const [status, setStatus] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    window.addEventListener('mousedown', checkClick);
  }, []);

  function handleClick() {
    socket.emit("update_status", status, localStorage.getItem('token'));
    setStatus("");
  }

  const checkClick = (e) => {
    if(formRef.current && !formRef.current.contains(e.target)) {
      setStatus("");
    }
  }

  return (
    <div class="modal fade" id="update-status" tabIndex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className={styles.content} ref={formRef}>
              <button type="button" className={styles.content__close} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <div className={styles.content__body}>
                  <span>I am </span>
                  <input value={status} className={styles.content__input} type="text" onChange={(e)=> setStatus(e.target.value)} placeholder={currentUser.status}></input>
              </div>
              <button onClick={handleClick} data-dismiss="modal" type="button" className={styles.content__button}>Update</button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default UpdateStatus;