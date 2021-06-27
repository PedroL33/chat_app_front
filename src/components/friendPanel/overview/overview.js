import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import Timeline from './timeline';
import { socket } from '../../dashboard';
import styles from '../../../styles/overview.module.css';

function Overview() {

    const [file, setFile] = useState("")
    const currentUser = useSelector(state => state.currentUser)
    const url = file === "" ? currentUser.picture : URL.createObjectURL(file) 

    const style = {
        backgroundImage: `url(${url})`
    } 

    function savePhoto() {
        let fd = new FormData();
        fd.append("image", file)
        socket.emit('profile_photo', file, localStorage.getItem('token'))
        setFile("")
    }

    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.portrait} style={style}>
                    <div className={styles.portrait__controls}>
                        {file==="" ? 
                        <label className={styles.portrait__fileUpload} data-toggle="tooltip" data-placement="top" title="Upload a Photo">
                            <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
                            <i className="fas fa-portrait"></i> 
                        </label>:
                        <div className={styles.portrait__buttons}>
                            <button className={styles.portrait__button} onClick={() => savePhoto()} data-toggle="tooltip" data-placement="top" title="Save">
                                <i className="fas fa-check"></i>
                            </button> 
                            <button className={styles.portrait__button} onClick={() => setFile("")} data-toggle="tooltip" data-placement="top" title="Clear">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>}
                    </div>
                </div>
                <div className={styles.username}>{currentUser.username}</div>
                <div className={styles.status}>
                  <div className={styles.status__message}>
                      Currently {currentUser.status}. &nbsp; 
                      <button type="button" className={styles.status__button} data-toggle="modal" data-target="#update-status">
                        <i className="fas fa-pen"></i>
                      </button>
                  </div>
                </div>
            </div>
            <div className={styles.activity}>
              <Timeline />
            </div>
        </div>
    )
}

export default Overview;