import React from 'react'
import './Signin.css'

export default class Signin extends React.Component{
   
    
      handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

      handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/login',{
          method: 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            username:this.state.username,
            password:this.state.password
          })
        }).then(res=>res.json())
    
        .then(user => {
          if(user.error){
            alert('Incorrect Username or Password. Please try again.')
            this.props.history.push('/sign-in')
          }
          else{
            localStorage.setItem('token',user.auth_token)
            localStorage.setItem('user',user.id)
            
          }
        })   
      }

      render(){
          return(
            <div className="login-page">
            <h1 ><strong>Welcome to Let's Meet</strong></h1>
            <div className="form">
                <form onSubmit={this.handleSubmit} className="login-form">
                    <input name = "username" onChange={this.handleChange} type="username" placeholder="Username"/>
                    <input name = "password" onChange={this.handleChange} type="password" placeholder="password" />
                    <button style={{"border-radius": "7px"}}onClick={(e) => this.handleSubmit(e)}>login</button>
                    <p className="message">Not registered? <a href = "/sign-up">Create an account</a></p>
                </form>
            </div>
       </div>
          )
      }
}