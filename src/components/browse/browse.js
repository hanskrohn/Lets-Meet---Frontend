import React from 'react'
import {PostForm} from './postForm'
import Posts from '../post/posts'
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
            'title': e.target['Title'].value,
            'address': e.target['Address'].value,
            'limit': e.target['limit'].value,
            'date': e.target['Date'].value,
            'time': e.target['Time'].value,
            'description': e.target['Description'].value
        }
        document.post.reset()
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
            this.props.createPost(post);
        })
        
    }
    componentDidMount(){
        fetch('http://localhost:3000/visiblePost', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(res => res.json())
        .then(post =>{
            console.log("in browse", post)
            this.props.getPost(post)
        })
    }
    render(){
        console.log("props", this.props)
        return(
                <Container style ={{maxWidth: '100%'}}>
                    <Row style={{height: '90vh'}}>
                        <Col  sm = {3} style = {{padding: '0'}}>
                            <DivStyle>
                                <PostForm createPost = {this.createPost}/>
                            </DivStyle>    
                            
                        </Col>
                        <Col  sm = {9}>
                            <div style = {{paddingTop: '120px', paddingBottom: '20px'}}>
                                {this.props.post.length !== 0 
                                    ? 
                                        <Div> 
                                            {this.props.post.map((item) => <Posts  currentUser = {this.props.currentUser} item = {item}/> )}
                                        </Div>
                                    : 
                                        <div style = {{textAlign: 'center', marginTop: '20%', fontSize: '250%'}}>
                                            Create or Follow Users to see Posts 
                                        </div>
                                }   
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
    },
    getPost: data => {
        return {type: 'GET_POST', payload: data}
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