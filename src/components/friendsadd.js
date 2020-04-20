import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from './dashboard';
import { listFriends } from '../actions';


function Friendsadd() {

    const dispatch = useDispatch();
    const [addFriend, setAddFriend] = useState("");
    const friendData = useSelector(state => state.friendData)

    return (
        <div>
            <div className="add-friend-form">
                <div className="mx-auto text-center">
                    <input className="form-control" type="text" onChange={(e) => setAddFriend(e.target.value)}></input>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-warning my-3" onClick={() => dispatch(listFriends())}>Back</button>
                        <button className="btn btn-outline-success my-3" onClick={() => socket.emit('send_request', addFriend)}>Add</button>
                    </div>
                </div>
            </div>
            <hr />
            <ul>
                {friendData.requests !== undefined && friendData.requests.map((item, i) => <li key={i}>
                    {item}
                    <button onClick={() => socket.emit('accept_request', item)}>Accept</button>
                    </li>)}
            </ul>
        </div>
    )
}

export default Friendsadd;