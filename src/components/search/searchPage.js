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
        console.log(this.props)
        return(
                <Container style ={{maxWidth: '100%'}}>
                    <div>
                        <Search name = "search" placeholder = "Search" onChange = { (e) => this.setState({search: e.target.value}) }/>
                    </div>
                    <div>
                        <Div>
                           <User search = {this.state.search}/> 
                        </Div>
                    </div>
                </Container>
        )

    }
}

const mapStateToProps = state => ({
    post: state.post,
    currentUser: state.currentUser
})



export default connect(mapStateToProps)(ProfilePage)

const Search = styled.input`
    margin-top: 8%;
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
    box-shadow: 0 0 25px;
    width: 86%;
    margin-left: 7%;
    margin-right: 7%;
    height: 100%;
`


