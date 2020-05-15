import React, {useState, useRef} from 'react';
import {socket} from './dashboard';
import {useSelector} from 'react-redux';
import Timeline from './timeline';

function Overview() {

    const [file, setFile] = useState("")
    const currentUser = useSelector(state => state.currentUser)
    const url = file === "" ? currentUser.picture : URL.createObjectURL(file) 
    const [status, setStatus] = useState("")
    const statusInput = useRef(null)

    const style = {
        backgroundImage: `url(${url})`
    } 

    function savePhoto() {
        let fd = new FormData();
        fd.append("image", file)
        socket.emit('profile_photo', file)
        setFile("")
    }

    function handleClick() {
        socket.emit("update_status", status)
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
                        <label className="file-upload">
                            <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
                            <i className="fas fa-portrait"></i> 
                        </label>:
                        <div className="d-flex flex-row">
                            <div className="mr-1">
                                <i onClick={() => savePhoto()} className="fas fa-check"></i>
                            </div> 
                            <div>
                                <i onClick={() => setFile("")} className="fas fa-times"></i>
                            </div>
                        </div>}
                    </div>
                </div>
                <div className="username">{currentUser.username}</div>
                <div className="status">
                    <div>
                        Currently {currentUser.status}. &nbsp; 
                        <button onClick={()=> clearForm()} type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModalCenter">
                            Update
                        </button>
                    </div>
                </div>
                <div class="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Let your friends know what you are doing!</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="row">
                                    <div className="col-3">I am...</div>
                                    <input ref={statusInput} className="col-8" type="text" onChange={(e)=> setStatus(e.target.value)} placeholder={currentUser.status}></input>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button onClick={() => handleClick()} data-dismiss="modal" type="button" class="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Timeline />
            </div>
        </div>
    )
}

export default Overview;