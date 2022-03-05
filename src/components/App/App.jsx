import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import useGlobalContext from '../../Context/ContextData.js';
import Navbar from './../Navbar/Navbar';
import Home from './../Home/Home';
import Register from './../Register/Register';
import Login from './../Login/Login';
import NotFound from './../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';

function App() {
  const { loginUSerInfo}=useGlobalContext();

useEffect(() => {
  if(localStorage.getItem('userToken')){
    loginUSerInfo();
  }
}, [])
  return (
    <>
  <Navbar/>
  <Switch>
    <ProtectedRoute path="/home" component={Home}/>
    <Route path="/register" render={()=><Register/>}/>
    <Route path="/login" render={()=><Login/>}/>
    <Redirect from='/' exact to='/login'/>
    <ProtectedRoute path="*" component={NotFound}/>
  </Switch>
    </>
  )
}

export default App
