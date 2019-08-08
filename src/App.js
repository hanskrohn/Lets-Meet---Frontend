import React from 'react';
import { Router } from 'react-router-dom'
import { Route } from 'react-router'
import history from './history'
import Signin from './components/user/signin.js'
import Signup from './components/user/signup.js'
import Browse from './components/browse/browse.js'
import NavBar from './components/navBar/navBar.js'




const App = () => {
  return (
    <Router history={history}>
        <NavBar />
        <Route exact path = "/sign-up" component = {Signup}></Route>
        <Route exact path = "/sign-in" component = {Signin}></Route>
        <Route exact path = "/" component = {Browse}></Route>
    </Router>
  );
}

export default App;
