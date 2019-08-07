import React from 'react';
import { Router } from 'react-router-dom'
import { Route } from 'react-router'
import history from './history'
import Signin from './components/user/signin.js'
import Signup from './components/user/signup.js'



const App = () => {
  return (
    <Router history={history}>
        <Route exact path = "/sign-up" component = {Signup}></Route>
        <Route exact path = "/sign-in" component = {Signin}></Route>
    </Router>
  );
}

export default App;
