import React from 'react'
import { connect } from 'react-redux'
import history from '../../history'
import './Signup.css'


const mapDispatchToProps = {
  handleSubmit: (e) => dispatch => {
    e.preventDefault()
        fetch('http://localhost:3000/signup',{
          method: 'POST',
          body: new FormData(e.target)
        }).then(user => {
          console.log(user)
          if(user.statusText === "Internal Server Error"){
            alert('Username or Email already taken. Please select another.')
          }
          else{
            history.push('/sign-in')
          }
        })
        
    }
}
const SignupForm = connect(null, mapDispatchToProps)((props) => {
        return(
            <div className="login-page">
                <h1 ><strong>Welcome to Let's Meet</strong></h1>
                <div className="form">
                    <form onSubmit={props.handleSubmit} className="login-form">
                        <input name = "username" type="username" placeholder="Username" required/>
                        <input name = "name" type="name" placeholder="Full Name" required/>
                        <input name = "email" type="email" placeholder="Email" required/>
                        <input name = "country" type="country" placeholder="Country" required />
                        <input name = "city" type="city" placeholder="City" required />
                        <input name = "password" type="password" placeholder="password"  required/>
                        <input type = 'file' id='profile_img' name='profile_img'/>
                        <textarea name = "bio" type="bio" placeholder="Tell us About Yourself" />
                        <button style={{"border-radius": "7px"}}>Sign Up</button>
                        <p className="message">Already registered? <a onClick={()=>history.push('/sign-in')}>Sign In</a></p>
                    </form>
                </div>
           </div>
        )
})
export default SignupForm