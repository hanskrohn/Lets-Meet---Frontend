import React from 'react';
import { Router } from 'react-router-dom'
import { Route } from 'react-router'
import history from './history'
import Signin from './components/authentication/signin.js'
import Signup from './components/authentication/signup.js'
import Browse from './components/browse/browse.js'
import NavBar from './components/navBar/navBar.js'
import Profile from './components/users/profile.js'




const App = () => {
  return (
    <Router history={history}>
        <NavBar />
        <Route exact path = "/sign-up" component = {Signup}></Route>
        <Route exact path = "/sign-in" component = {Signin}></Route>
        <Route exact path = "/" component = {Browse}></Route>
        <Route exaxt path = '/profile' component = {Profile}></Route>
    </Router>
  );
}

export default App;
