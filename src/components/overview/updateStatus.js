import React, { useContext } from 'react';
import { SocketContext } from '../../context/socket';
import { useSelector } from 'react-redux';

const UpdateStatus = (props) => {

  const socket = useContext(SocketContext)
  const currentUser = useSelector(state => state.currentUser)

  function handleClick() {
    socket.emit("update_status", props.status, localStorage.getItem('token'))
  }

  return (
    <div class="modal fade" id="update-status" tabIndex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <button type="button" className="modal-close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-body">
                <span>I am </span>
                <input value={props.status} className="modal-input" type="text" onChange={(e)=> props.setStatus(e.target.value)} placeholder={currentUser.status}></input>
            </div>
            <button onClick={() => handleClick()} data-dismiss="modal" type="button" class="modal-button">Update</button>
          </div>
      </div>
    </div>
  )
}

export default UpdateStatus;