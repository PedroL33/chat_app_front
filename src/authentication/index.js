import { loginSuccess, setLoginErrors } from "../actions";
import { useDispatch } from 'react-redux';

export const login = (username, password) => {
    const dispatch = useDispatch()
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            username: username, 
            password: password
        })
    })
    .then( results => results.json())
    .then( data => {
        if(data.token) {
            localStorage.setItem('token', data.token)
            dispatch(loginSuccess());
        }else {
            dispatch(setLoginErrors(data))
        }
    })
    .catch(err => {
        dispatch(setLoginErrors(err))
    })
}
