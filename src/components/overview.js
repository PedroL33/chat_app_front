import React, {useState, useRef, useContext} from 'react';
import {useSelector} from 'react-redux';
import Timeline from './timeline';
import { SocketContext } from '../context/socket';

function Overview() {

    const [file, setFile] = useState("")
    const currentUser = useSelector(state => state.currentUser)
    const url = file === "" ? currentUser.picture : URL.createObjectURL(file) 
    const [status, setStatus] = useState("")
    const statusInput = useRef(null)
    const socket = useContext(SocketContext);

    const style = {
        backgroundImage: `url(${url})`
    } 

    function savePhoto() {
        let fd = new FormData();
        fd.append("image", file)
        socket.emit('profile_photo', file, localStorage.getItem('token'))
        setFile("")
    }

    function handleClick() {
        socket.emit("update_status", status, localStorage.getItem('token'))
    }

    function clearForm() {
        statusInput.current.value="";
    }

    return (
        <div className="overview-container">
            <div className="overview">
                <div className="profile-portrait" style={style}>
                    <div className="profile-picture-controls">
                        {file==="" ? 
                        <label className="file-upload" data-toggle="tooltip" data-placement="top" title="Upload a Photo">
                            <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
                            <i className="fas fa-portrait"></i> 
                        </label>:
                        <div className="d-flex flex-row">
                            <button className="btn-sm btn-success" onClick={() => savePhoto()} data-toggle="tooltip" data-placement="top" title="Save">
                                <i className="fas fa-check"></i>
                            </button> 
                            <button className="btn-sm btn-danger" onClick={() => setFile("")} data-toggle="tooltip" data-placement="top" title="Clear">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>}
                    </div>
                </div>
                <div className="username">{currentUser.username}</div>
                <div className="status-container">
                  <div className="status">
                        Currently {currentUser.status}. &nbsp; 
                        <button onClick={()=> clearForm()} type="button" className="update-status-button" data-toggle="modal" data-target="#update-status">
                          <i className="fas fa-pen"></i>
                        </button>
                  </div>
                </div>
                <div class="modal fade" id="update-status" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <button type="button" className="modal-close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                          <div className="modal-body">
                              <span>I am </span>
                              <input ref={statusInput} className="modal-input" type="text" onChange={(e)=> setStatus(e.target.value)} placeholder={currentUser.status}></input>
                          </div>
                          <button onClick={() => handleClick()} data-dismiss="modal" type="button" class="modal-button">Update</button>
                        </div>
                    </div>
                </div>
                <Timeline />
            </div>
        </div>
    )
}

export default Overview;