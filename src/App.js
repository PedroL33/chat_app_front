import React, {useEffect} from 'react';
import './App.css';
import Login from './components/login';
import { Dashboard } from './components/dashboard';
import Signup from './components/signup';
import Info from './components/info';
import { useSelector } from 'react-redux';

function App() {

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      
    }
  }, [])
  const nav = useSelector(state => state.nav) 
  const auth = useSelector(state => state.authenticated)

  return (
    <div>
      {auth ? <Dashboard /> : nav=="login" ? <Login /> : nav=="signup" ? <Signup /> : <Info />}
    </div>
  );
}

export default App;
