import React from 'react';
import {slide as Menu} from 'react-burger-menu';
import Friendslist from './friendslist';
import Friendsadd from './friendsadd';
import {useSelector} from 'react-redux';

function Sidebar() {

    var nav = useSelector(state => state.friendPanel)
    
    return (
        <div id="sidebar" >
            <Menu pageWrapId={"content"} outerContainerId={"sidebar"}>
                { nav ==="add" ?  <Friendsadd /> : <Friendslist /> } 
            </Menu>
        </div>
    )
}

export default Sidebar;