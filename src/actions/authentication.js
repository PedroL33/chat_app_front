export const loginSuccess = () => {
  return {
      type: "LOGIN_SUCCESS"
  }
}

export const setLoginErrors = (errors) => {
  return {
      type: "SET_LOGIN_ERRORS",
      payload: errors
  }
}

export const login = (username, password) => {
  return (dispatch) => {
    fetch('https://intense-journey-99404.herokuapp.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            username: username.trim(), 
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
        dispatch(setLoginErrors({error: "Server error."}))
    })
  }
}

export const setSignupErrors = (errors) => {
  return {
      type: "SET_SIGNUP_ERRORS",
      payload: errors
  }
}

export const clearSignupErrors = () => {
  return { 
      type: "CLEAR_SIGNUP_ERRORS"
  }
}

export const signup = (username, password, email) => {
  return async (dispatch) => {
    const signup = await fetch('https://intense-journey-99404.herokuapp.com/signup', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username.trim(),
            password: password,
            email: email.trim()
        })
    })
    const res = await signup.json();
    if(res.token) {
      localStorage.setItem('token', res.token)
      dispatch(loginSuccess())
      dispatch(clearSignupErrors())
    }else {
        dispatch(setSignupErrors(res))
    }
  }
}