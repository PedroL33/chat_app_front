import React, {useState} from 'react';
import {socket} from './dashboard';
import axios from 'axios';

function Overview() {

    const [file, setFile] = useState("")

    const style = file === "" ? {} : {
        backgroundImage: `url(${URL.createObjectURL(file)})`
    }

    function savePhoto() {
        let fd = new FormData();
        fd.append("image", file)
        fetch('http://localhost3000/upload', {
            method: 'post',
            body: fd
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    return (
        <div className="overview">
            <div className="profile-portrait" style={style}></div>
            {file==="" ? 
            <label className="file-upload">
                <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
                <i class="fas fa-portrait"></i> 
            </label>:
            <div>
                <button onClick={() => setFile("")}>Clear</button>
                <button onClick={() => savePhoto()}>Save</button>
            </div> }
        </div>
    )
}

export default Overview;