import React from 'react'
import { connect } from 'react-redux'
import history from '../../history'
import './Signup.css'

const mapDispatchToProps = {
    setCurrentUser: data => {
        return { payload: data, type: 'CURRENT_USER'}
    }
}

  
const SignupForm =connect(null, mapDispatchToProps)((props) => {

    const handleSubmit = (e) =>  {
        e.preventDefault()
        const response = {
          'username': e.target['username'].value,
          'password': e.target['password'].value,
        }
          fetch('http://localhost:3000/signup',{
              method: 'POST',
              body: new FormData(e.target)
            }).then(res => {
              if(res.statusText === "Internal Server Error"){
                  alert('Username or Email already taken. Please select another.')
              }
              else{
                  res.json()
              }
            })
            .then(user => {
                fetch('http://localhost:3000/login',{
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(response)
                    })
                    .then(res => res.json())
                    .then(user => {
                    if(user.message === "Login Failed"){
                        alert('Username or Password Incorrect. Please try again.')
                    }
                    else{
                        localStorage.setItem('token', user.auth_token)
                        history.push('/sign-up/2')
                    }
            })
        })
        
    }
        return(
            <div className="login-page">
                <h1 ><strong>Welcome to Let's Meet</strong></h1>
                <div className="form">
                    <form onSubmit={handleSubmit} className="login-form">
                        <input name = "username" type="username" placeholder="Username" required/>
                        <input name = "name" type="name" placeholder="Full Name" required/>
                        <input name = "email" type="email" placeholder="Email" required/>
                        <input name = "country" type="country" placeholder="Country" required />
                        <input name = "city" type="city" placeholder="City" required />
                        <input name = "password" type="password" placeholder="password"  required/>
                        <textarea name = "bio" type="bio" placeholder="Tell us About Yourself" />
                        <button style={{"border-radius": "7px"}}  >Next</button>
                        <p className="message">Already registered? <a onClick={()=>history.push('/sign-in')}>Sign In</a></p>
                    </form>
                </div>
           </div>
        )
})



export default SignupForm