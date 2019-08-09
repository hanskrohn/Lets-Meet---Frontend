import React from 'react'
import {PostForm} from './postForm'
import {Posts} from './posts'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'


import './Browse.css'


class Browse extends React.Component {

    createPost = e =>{
        e.preventDefault()
        console.log("this is e", e.target)
        const data = {
            'Title': e.target['Title'].value,
            'Address': e.target['Address'].value,
            'Number': e.target['Number'].value,
            'Date': e.target['Date'].value,
            'Time': e.target['Time'].value,
            'Description': e.target['Description'].value
        }
        document.post.reset()
        console.log('daddyy', data)
        fetch('http://localhost:3000/createPost',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify(data)
        })
        .then( res => res.json())
        .then( post =>{
            console.log(post);
            this.props.createPost(post);
        })
        .catch( err => console.log('this be our err', err))
    }
    render(){
        console.log(" current user" , this.props.currentUser)
        return(
                <Container style ={{maxWidth: '100%'}}>
                    <Row style={{height: '90vh'}}>
                        <Col  sm = {3} style = {{padding: '0'}}>
                            <DivStyle>
                                
                                <PostForm createPost = {this.createPost}/>
                            </DivStyle>    
                            
                        </Col>
                        <Col  sm = {9}>
                            <div style = {{marginTop: '10%'}}>
                                {this.props.post ? <Div> {this.props.post.map((item) => <Posts item = {item}/> ) }</Div>: null}   
                            </div>
                        </Col>
                    </Row>
                </Container>
        )

    }
}

const mapStateToProps = state => ({
        post: state.post,
        currentUser: state.currentUser
})

const mapDispatchToProps = {
    createPost: data => {
        return { payload: data, type: 'CREATE_POST' }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Browse)

const Div = styled.div`
    border: 2px solid #ccc;
`
const DivStyle = styled.div`
    resize: none;
    box-shadow: 0 0 25px;
    position: fixed;
    width: 25%;
    top: 0;
    height: 100%;

`