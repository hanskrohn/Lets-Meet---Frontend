import React, {useState, useEffect} from 'react';
import { Router } from 'react-router-dom'
import { Route } from 'react-router'
import { connect } from 'react-redux'
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
import CommentsPage from './components/post/commentsPage.js'
import EventsPage from './components/events/eventsPage.js'
import EventsShowPage from './components/events/eventsShowPage.js'


const App = (props) => {

  useEffect(() => {
      fetch('http://localhost:3000/current_user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
    })
    .then(res => res.json())
    .then(user =>{
        props.setCurrentUser(user)
    }) 

    fetch(`http://localhost:3000/users/events`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(res => res.json())
        .then(data => {
            props.attendEvent(data)
            
        })
}, [props.currentUser.id] )

  return (
    <Router history={history}>
        <NavBar />
        <Route exact path = "/sign-up" component = {Signup}></Route>
        <Route exact path = "/sign-in" component = {Signin}></Route>
        <Route exact path = "/browse" component = {Browse}></Route>
        <Route exaxt path = '/profile' component = {ProfilePage}></Route>
        <Route exaxt path = '/search' component = {SearchPage}></Route>
        <Route exact path = '/users/:id' component = {UserPage}></Route>
        <Route exact path = '/following' component = {Following}></Route>
        <Route exact path = '/followers' component = {Followers}></Route>
        <Route exact path = '/comments/post/:id' component = {CommentsPage}></Route>
        <Route exact path = '/notifications' component = {EventsPage}></Route>
        <Route exact path = '/event/show/:id' component = {EventsShowPage}></Route>
    </Router>
  );
}

const mapStateToProps = state => ({
  posts: state.postsAttending,
  currentUser: state.currentUser
})


const mapDispatchToProps ={
  getUser: data => {
      return { payload: data, type: 'GET_USERS',}
  },
  attendEvent: data => {
      return { payload: data, type: 'POST_ATTENDING'}
  },
  setCurrentUser: data => {
    return { payload: data, type: 'CURRENT_USER'}
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);

