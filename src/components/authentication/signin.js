import React from 'react'
import { connect } from 'react-redux'
import history from '../../history'
import './Signin.css'

const mapDispatchToProps = {
    handleSubmit: (e) => async dispatch => {
      e.preventDefault()
      const response = {
        'username': e.target['username'].value,
        'password': e.target['password'].value,
      }
        await fetch('http://localhost:3000/login',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(response)
        }).then(res => res.json())
        .then(user => {
        if(user.message === "Login Failed"){
            alert('Username or Password Incorrect. Please try again.')
        }
        else{
            localStorage.setItem('token', user.auth_token)
            history.push('/browse')
        }
        })
                
        await fetch('http://localhost:3000/current_user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(res => res.json())
        .then(user =>{
            console.log(localStorage.getItem('token'))
            dispatch({type: 'CURRENT_USER', payload: user})
        })
        
        await fetch('http://localhost:3000/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(res => res.json())
        .then(user =>{
            dispatch({type: 'GET_USERS', payload: user})
        })
        
        
    }

    
}

const SigninForm = connect(null, mapDispatchToProps)((props) => {
    return(
        <div className = "backGroundImage">
            <div className="login-page">
                <div className ="blur">
                <div className="form">
                    <div style = {{marginBottom: '10%'}}>
                        <h1 ><strong>Welcome to Let's Meet</strong></h1>
                    </div>
                    <div>
                        <form onSubmit={props.handleSubmit} className="login-form">
                            <input name = "username" type="username" placeholder="Username"/>
                            <input name = "password" type="password" placeholder="password" />
                            <button style={{"border-radius": "7px"}}>login</button>
                            <p className="message">Not registered? <a onClick={()=>history.push('/sign-up')}>Sign Up</a></p>
                        </form>
                    </div>
                </div>
                </div>
            </div>
       </div>
    )
})


export default (SigninForm)