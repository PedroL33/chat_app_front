import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navInfo, navSignup, clearLoginErrors } from '../actions';
import { login } from '../actions/authentication';
import styles from '../styles/forms.module.css';

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const errors = useSelector(state => state.loginErrors)

    function handleSubmit(e) {
        dispatch(login(username, password))
    }

    function handleClick(e, action) {
        e.preventDefault();
        dispatch(action);
        dispatch(clearLoginErrors())
        setUsername("")
        setPassword("")
    }

    return (
        <div className={styles.form}>
            <div className={styles.form__title}>Login</div>
            <div className={styles.form__links}>
              <div className={styles.form__link} onClick={e => handleClick(e, navInfo())}>About</div>
              <div className={styles.form__link} onClick={e => handleClick(e, navSignup())}>Signup</div>
            </div>
            <span className={styles.form__error}>{errors['error'] && errors['error']}</span>
            <input className={errors.error ? `${styles.form__input} ${styles.form__error}`: styles.form__input} type="text" onChange={e => setUsername(e.target.value)} placeholder="Username"></input>
            <input className={errors.error ? `${styles.form__input} ${styles.form__error}`: styles.form__input} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password"></input>
            <button className={styles.form__submit} onClick={e => handleSubmit(e)}>Login</button>
        </div>
    )
}

export default Login;