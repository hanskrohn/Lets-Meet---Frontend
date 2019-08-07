import React from 'react'
import { connect } from 'react-redux'
import './Signup.css'


const mapStateToProps = state => {
  return{
    username: state.username,
    name: state.name,
    email: state.email,
    country: state.country,
    city: state.city,
    username: state.username,
    bio: state.bio,
  }
}
const mapDispatchToProps = {
  handleSubmit: (e) => dispatch => {
    e.preventDefault()
    const response = {
      'username': e.target['username'].value,
      'name': e.target['name'].value,
      'email': e.target['email'].value,
      'country': e.target['country'].value,
      'city': e.target['city'].value,
      'password': e.target['password'].value,
      'bio': e.target['bio'].value

    }
    let errors = validate(response)
    console.log(errors)
    if( errors.length === 0){
        fetch('http://localhost:3000/signup',{
          method: 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(response)
        }).then(user => {
          console.log(user)
          if(user.statusText === "Internal Server Error"){
            alert('Username or Email already taken. Please select another.')
          }
          else{
            dispatch({type: 'SIGN_UP'})
          }
        })
        
    }
    else{
      let organizedErrors = ''
      for(let i = 1; i<errors.length; i++){
        organizedErrors = organizedErrors + '- ' + errors[i] + '\n'
      }
      alert(organizedErrors)
    }

  }
}
const validate = (data) => {
  console.log(data)
  const errors = []
  if(data['username'] === '' ){
    errors.push("Username cannot be empty")
  }
  if (data['name'] === '' ) {
    errors.push("Name cannot be empty")
  }
  if (data['email'].length < 5 ) {
    errors.push("Email should be at least five charcters long") 
  }
  if (data['country'] === '' ) {
    errors.push("Country cannot be empty")
  }
  if (data['city'] === '' ) {
    errors.push("City cannot be empty")
  }
  if (data['password'] === '' ) {
    errors.push("Password cannot be empty")
  }
  console.log(errors)
  return errors

}
const SignupForm = connect(mapStateToProps, mapDispatchToProps)((props) => {
        return(
            <div className="login-page">
                <h1 ><strong>Welcome to Let's Meet</strong></h1>
                <div className="form">
                    <form onSubmit={props.handleSubmit} className="login-form">
                        <input name = "username" type="username" placeholder="Username"/>
                        <input name = "name" type="name" placeholder="Full Name"/>
                        <input name = "email" type="email" placeholder="Email"/>
                        <input name = "country" type="country" placeholder="Country" />
                        <input name = "city" type="city" placeholder="City" />
                        <input name = "password" type="password" placeholder="password" />
                        <input name = "bio" type="bio" placeholder="Tell us About Yourself" />
                        <button style={{"border-radius": "7px"}}>login</button>
                        <p className="message">Not registered? <a href = "/sign-up">Create an account</a></p>
                    </form>
                </div>
           </div>
        )
})
export default SignupForm