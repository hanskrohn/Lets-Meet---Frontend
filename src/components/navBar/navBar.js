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
     
      <Navbar style={{ minHeight: '9vh', borderRadius: '0px', marginBottom: '0px', backgroundColor: '#0177F9', boxShadow: '0 0 25px 0 rgba(0,0,0,0.4)', zIndex: '2', position: 'fixed', width: '100%'}}  variant="dark" className="d-flex justify-content-around">
        <div>
          <Nav.Link style = {{ fontSize: '2.5vh', padding: '0', color: 'black', display: 'inline-block' }} onClick={()=>{
            history.push('/')
            window.scrollTo(0, 0)
            }}><i  class="glyphicon glyphicon-home"></i>
          </Nav.Link>
        </div>
        <div>
          <Nav.Link style = {{ fontSize: '2.5vh', padding: '0', color: 'black', display: 'inline-block' }} onClick={()=>{history.push('/events') 
          window.scrollTo(0, 0)
          }}><i class="glyphicon glyphicon-bell"></i></Nav.Link>
        </div>
            <Navbar.Brand style = {{ fontSize: '2.5vh', padding: '0', color: 'black', display: 'inline-block' }} >Navbar</Navbar.Brand>
           
        <div>
          <Nav.Link style = {{ fontSize: '2.5vh', padding: '0', color: 'black', display: 'inline-block' }} onClick={()=>{history.push('/search') 
            window.scrollTo(0, 0)
            }}><i class="glyphicon glyphicon-search"></i>
          </Nav.Link>
        </div> 
        <div>
          <Nav.Link style = {{ fontSize: '2.5vh', padding: '0', color: 'black', display: 'inline-block' }} onClick={()=>{
            history.push('/profile') 
            window.scrollTo(0, 0)
            }}>
              <i class="glyphicon glyphicon-user"></i>
          </Nav.Link>
        </div>       
      </Navbar>
  ))
  export default NavBar
 
  