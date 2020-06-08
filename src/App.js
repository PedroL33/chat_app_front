import React, {useEffect} from 'react';
import './App.css';
import Login from './components/login';
import { Dashboard } from './components/dashboard';
import Signup from './components/signup';
import Info from './components/info';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from './actions';
import jwt from 'jwt-decode';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      try {
        const decoded = jwt(token)
        if(decoded.exp > Date.now()/1000) {
          dispatch(loginSuccess())
        }
      }
      catch{
        console.log("Invalid token.")
      }
    }
  }, [])
  
  const nav = useSelector(state => state.nav) 
  const auth = useSelector(state => state.authenticated)

  return (
    <div className="app-container" style={{backgroundImage: `url(${window.location}images/background.jpg)`}}>
      {auth ? <Dashboard /> : nav=="login" ? <Login /> : nav=="signup" ? <Signup /> : <Info />}
    </div>
  );
}

export default App;
