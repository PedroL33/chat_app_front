import React, { useState } from 'react';
import { navLogin, navInfo } from '../actions';
import { signup, setSignupErrors, clearSignupErrors } from '../actions/authentication';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/forms.module.css';

function Signup() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [email, setEmail] = useState("");

    const errorData = useSelector(state => state.signupErrors)

    const errors = {}
    if(errorData.errors) {
        errorData.errors.forEach(item => {
        errors[item.param] = item.msg
        })
    }

    function handleClick(e, action) {
        e.preventDefault(e);
        dispatch(action);
        dispatch(clearSignupErrors())
        setUsername("")
        setPassword("")
        setConfirm("")
        setEmail("")
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(confirm !== password) {
            dispatch(setSignupErrors({
                errors: ["Passwords do not match."]
            }))
        }else {
            dispatch(signup(username, password, email));
        }
    }

    return (
        <div className={styles.form}>
            <div className={styles.form__title}>Signup</div>
            <label className={styles.form__label}>Username:</label>
            {errors.body && <span className={styles.form__error}>&nbsp;{errors.body}</span>}
            {errors.username && <span className={styles.form__error}>&nbsp;{errors.username}</span>}
            <input className={errors.username ? `${styles.form__input} ${styles.form__error}`: styles.form__input} type="text" placeholder="Minimum 4 characters." onChange={e=>setUsername(e.target.value)}></input>
            <label className={styles.form__label}>Email:</label>
            {errors.email && <span className={styles.form__error}>&nbsp;{errors.email}</span>}
            <input className={errors.email ? `${styles.form__input} ${styles.form__error}`: styles.form__input} type="text" placeholder="Email with a valid format." onChange={e=>setEmail(e.target.value)}></input>
            <label className={styles.form__label}>Password:</label>
            {errors.password && <span className={styles.form__error}>&nbsp;{errors.password}</span>}
            <input className={errors.password ? `${styles.form__input} ${styles.form__error}`: styles.form__input} type="password" placeholder="Minimum 6 characters." onChange={e=>setPassword(e.target.value)}></input>
            <label className={styles.form__label}>Confirm Password</label>
            <input className={styles.form__input} type="password" placeholder="Must match password." onChange={e=>setConfirm(e.target.value)}></input>
            <button className={styles.form__submit} onClick={(e) => handleSubmit(e)}>Signup</button>
            <div className={styles.form__links}>
                <div className={styles.form__link} onClick={(e) => handleClick(e, navInfo())}>About</div>
                <div className={styles.form__link} onClick={(e) => handleClick(e, navLogin())}>Login</div>
            </div>
        </div>
    )
}

export default Signup;