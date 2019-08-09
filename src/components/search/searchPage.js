import React from 'react'
import Container from 'react-bootstrap/Container'
import { connect } from 'react-redux'
import styled from 'styled-components'
import User from './user.js'

class ProfilePage extends React.Component {
    state = {
        search: ''
    }
    render(){
        let users;
        if(this.state.search){   
          users = this.props.users.filter( (user)=>{
            return user.name.toLowerCase().includes(this.state.search)
          })
        }
        console.log(" this is users", users)
        return(
                <Container style ={{maxWidth: '100%', paddingTop: '120px'}}>
                    <div>
                        <Search name = "search" placeholder = "Search" onChange = { (e) => this.setState({search: e.target.value}) }/>
                    </div>
                    <div style ={{paddingBottom: '50px'}}>
                        <Div >
                            
                                { this.state.search !== "" 
                                    ? 
                                        <div style = {{ paddingBottom: '3%'}}> 
                                            {users.map((user) => < User  user = {user} />)}
                                        </div> 
                                    : 
                                        null
                                }
                            
                        </Div>
                    </div>
                </Container>
        )

    }
}

const mapStateToProps = state => ({
    post: state.post,
    currentUser: state.currentUser,
    users: state.users
})



export default connect(mapStateToProps)(ProfilePage)

const Search = styled.input`
    width: 90%;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    resize: none;
    margin-bottom: 5px;
    margin-left: 5%;
    margin-right: 5%;
`
const Div = styled.div`
    margin-top: 3%;
    box-shadow: 0 0 50px 0 rgba(0,0,0,0.4), 0 0px 20px 0 rgba(0,0,0,0.19);
    width: 86%;
    margin-left: 7%;
    margin-right: 7%;
    height: 100%;
    
`


