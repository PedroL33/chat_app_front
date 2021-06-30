import React, {useEffect, useRef} from'react';
import {useSelector, useDispatch} from 'react-redux';
import { addConversation } from '../../../actions';
import styles from '../../../styles/overview.module.css';

function Timeline() {

    const timelineEvents = useSelector(state => state.timelineEvents)
    const dispatch = useDispatch();
    const displayRef = useRef(null)

    useEffect(() => {
      displayRef.current && displayRef.current.scrollIntoView({ behavior: 'smooth' });
    })

    function handleClick(username) {
        dispatch(addConversation(username))
    }

    return (
        <div className={styles.timeline}>
            <div className={styles.timeline__header}>Activity Log</div>
            <div className={styles.timeline__content}>
                {timelineEvents.map(item => (
                    <div className={styles.timeline__event}>
                        <em className={styles.timeline__link} onClick={()=> handleClick(item.username)}>
                            {item.username}
                        </em>
                        {item.message}&nbsp; 
                        <time className={styles.timeline__time}>
                            {item.time}
                        </time>
                    </div>
                    )
                )}
                <div ref={displayRef}></div>
            </div>
        </div>
    )
}

export default Timeline;