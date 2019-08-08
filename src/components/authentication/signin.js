import React from 'react'
import { connect } from 'react-redux'
import history from '../../history'
import './Signin.css'

const mapDispatchToProps = {
    handleSubmit: (e) => dispatch => {
      e.preventDefault()
      const response = {
        'username': e.target['username'].value,
        'password': e.target['password'].value,
      }
        fetch('http://localhost:3000/login',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(response)
        }).then(res => res.json())
        .then(user => {
        console.log(user)
        if(user.statusText === "Internal Server Error"){
            alert('Username or Email already taken. Please select another.')
        }
        else{
            localStorage.setItem('token', user.auth_token)
            history.push('/')
        }
        })
          
        
    }
}

const SigninForm = connect(null, mapDispatchToProps)((props) => {
    return(
        <div className="login-page">
            <h1 ><strong>Welcome to Let's Meet</strong></h1>
            <div className="form">
                <form onSubmit={props.handleSubmit} className="login-form">
                    <input name = "username" type="username" placeholder="Username"/>
                    <input name = "password" type="password" placeholder="password" />
                    <button style={{"border-radius": "7px"}}>login</button>
                    <p className="message">Already registered? <a href="/sign-in">Sign In</a></p>
                </form>
            </div>
       </div>
    )
})

export default SigninForm