import React from 'react';
import { Router } from 'react-router-dom'
import { Route } from 'react-router'
import history from './history'
import Signin from './components/authentication/signin.js'
import Signup from './components/authentication/signup.js'
import Browse from './components/browse/browse.js'
import NavBar from './components/navBar/navBar.js'
import ProfilePage from './components/currentUser/profilePage.js'
import UserPage from './components/otherUsers/profilePage.js'
import SearchPage from './components/search/searchPage.js'
import Following from './components/following-followee/following.js'
import Followers from './components/following-followee/followers.js'


const App = () => {
  return (
    <Router history={history}>
        <NavBar />
        <Route exact path = "/sign-up" component = {Signup}></Route>
        <Route exact path = "/sign-in" component = {Signin}></Route>
        <Route exact path = "/" component = {Browse}></Route>
        <Route exaxt path = '/profile' component = {ProfilePage}></Route>
        <Route exaxt path = '/search' component = {SearchPage}></Route>
        <Route exact path = '/users/:id' component = {UserPage}></Route>
        <Route exact path = '/following' component = {Following}></Route>
        <Route exact path = '/followers' component = {Followers}></Route>
    </Router>
  );
}

export default App;

