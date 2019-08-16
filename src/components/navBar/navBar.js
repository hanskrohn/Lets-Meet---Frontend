import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { withRouter } from 'react-router-dom'
import './navbar.css'

//with router makes it update whenever history changes
const NavBar = withRouter(({ history }) => (
    ['/sign-in', '/sign-up'].includes(history.location.pathname) ?
      null 
        :
     
      <Navbar style={{ minHeight: '9vh', borderRadius: '0px', marginBottom: '0px', backgroundColor: '#0177F9', boxShadow: '0 0 25px 0 rgba(0,0,0,0.4)', zIndex: '2', position: 'fixed', width: '100%'}}  variant="dark" className="d-flex justify-content-around">
        <div className = "displayBox">
          <Nav.Link style = {{ fontSize: '3vh', paddingTop: '17px', color: 'black', display: 'inline-block' }} onClick={()=>{
            history.push('/browse')
            window.scrollTo(0, 0)
            }}><i  class="glyphicon glyphicon-home"></i>
          </Nav.Link>
            <p className = "text" style = {{fontSize: '100%', marginLeft: '12px', color: 'black', marginTop: '-7px'}}>Home</p>
        </div>
        <div className = "displayBox">
          <Nav.Link style = {{ fontSize: '3vh', paddingTop: '17px', color: 'black', display: 'inline-block' }} onClick={()=>{history.push('/notifications') 
          window.scrollTo(0, 0)
          }}><i class="glyphicon glyphicon-bell"></i>
          </Nav.Link>
          <p className = "text" style = {{fontSize: '100%', marginLeft: '-5px', color: 'black', marginTop: '-7px'}}>Notifications</p>
        </div>
            <Navbar.Brand style = {{ fontSize: '3vh', paddingTop: '17px', color: 'black', display: 'inline-block' }} >Navbar</Navbar.Brand>
           
        <div className = "displayBox">
          <Nav.Link style = {{ fontSize: '3vh', paddingTop: '17px', color: 'black', display: 'inline-block' }} onClick={()=>{history.push('/search') 
            window.scrollTo(0, 0)
            }}><i class="glyphicon glyphicon-search"></i>
          </Nav.Link>
          <p className = "text" style = {{fontSize: '100%', marginLeft: '8px', color: 'black', marginTop: '-7px'}}>Search</p>
        </div> 
        <div className = "displayBox">
          <Nav.Link style = {{ fontSize: '3vh', paddingTop: '17px', color: 'black', display: 'inline-block' }} onClick={()=>{
            history.push('/profile') 
            window.scrollTo(0, 0)
            }}>
              <i class="glyphicon glyphicon-user"></i>
          </Nav.Link>
          <p className = "text" style = {{fontSize: '100%', marginLeft: '11px', color: 'black', marginTop: '-7px'}}>Profile</p>
        </div>       
      </Navbar>
  ))
  export default NavBar
 
  