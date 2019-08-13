import React from 'react'
import Container from 'react-bootstrap/Container'
import { connect } from 'react-redux'
import styled from 'styled-components'
import User from '../search/user.js'

class Following extends React.Component {
    state = {
        search: ''
    }
  
    unfollow = (user) =>{
        console.log(user)
        fetch(`http://localhost:3000/unfollow/${user.id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify(user)
        })

    }

    render(){
        let users;
        if(this.state.search){   
          users = this.props.following.filter( (user)=>{
            return user.username.toLowerCase().includes(this.state.search)
          })
        }
        
        return(
                <Container style ={{maxWidth: '100%', paddingTop: '120px'}}>
                    <div>
                        <Search  autocomplete= "off" name = "search" placeholder = "Search" onChange = { (e) => this.setState({search: e.target.value}) }/>
                    </div>
                    <div style ={{paddingBottom: '50px'}}>
                        <Div >
                            <div style = {{ paddingBottom: '3%'}}> 
                                {this.props.following.map((user) => < User unfollow = {this.unfollow} user = {user} />)}
                            </div> 
                        </Div>
                    </div>
                </Container>
        )

    }
}

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    following: state.following
})


const mapDispatchToProps ={
    getUser: data => {
        return {type: 'GET_USERS', payload: data}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Following)

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


