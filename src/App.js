import React, {useEffect} from 'react';
import './App.css';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Signup from './components/signup';
import Info from './components/info';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from './actions/authentication';
import jwt from 'jwt-decode';
import { SocketContext, socket } from './context/socket';

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
      <div className="app-container">
        {
          auth ? 
            <SocketContext.Provider value={socket}>
              <Dashboard />
            </SocketContext.Provider>: 
          nav=="login" ? <Login /> :
          nav=="signup" ? <Signup />:
          <Info />} 
      </div>
  );
}

export default App;
