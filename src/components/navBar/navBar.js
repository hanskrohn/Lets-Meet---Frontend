import React from 'react'
import history from '../../history'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { withRouter } from 'react-router-dom'

//with router makes it update whenever history changes
const NavBar = withRouter(({ history }) => (
    ['/sign-in', '/sign-up'].includes(history.location.pathname) ?
      null 
        :
     
      <Navbar style={{ borderRadius: '0px', marginBottom: '0px', backgroundColor: '#0177F9', boxShadow: '0 0 25px 0 rgba(0,0,0,0.4)', zIndex: '2', position: 'fixed', width: '100%'}}  variant="dark" className="d-flex justify-content-around">
          
            <Nav.Link style = {{ fontSize: '5vh', paddingTop: '1vh', color: 'black', display: 'inline-block' }} onClick={()=>history.push('/')}><i  class="glyphicon glyphicon-home"></i></Nav.Link>
         
          
            <Nav.Link style = {{ fontSize: '5vh', paddingTop: '1vh', color: 'black', display: 'inline-block' }} href="#features"><i class="glyphicon glyphicon-calendar"></i></Nav.Link>
    
            <Navbar.Brand style = {{ fontSize: '5vh', paddingTop: '1vh', color: 'black', display: 'inline-block' }} >Navbar</Navbar.Brand>
           
            
            <Nav.Link style = {{ fontSize: '5vh', paddingTop: '1vh', color: 'black', display: 'inline-block' }} onClick={()=>history.push('/search')}><i class="glyphicon glyphicon-search"></i></Nav.Link>
           
            
            <Nav.Link style = {{ fontSize: '5vh', paddingTop: '1vh', color: 'black', display: 'inline-block' }} onClick={()=>history.push('/profile')}><i class="glyphicon glyphicon-user"></i></Nav.Link>
           
      </Navbar>
     
  
  ))
  export default NavBar
 
  