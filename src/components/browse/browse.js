import React from 'react'
import {PostForm} from './postForm'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Browse.css'


class Browse extends React.Component {
    componentDidMount(){

    }
    createPost = e =>{
        e.preventDefault()
        console.log(e.target)
        const data = {
            'Title': e.target['Title'].value,
            'Address': e.target['Address'].value,
            'Number': e.target['Number'].value,
            'Date': e.target['Date'].value,
            'Time': e.target['Time'].value,
            'Description': e.target['Description'].value
        }
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
        return(
                <Container style ={{maxWidth: '100%'}}>
                    <Row style={{height: '90vh'}}>
                        <Col style ={{boxShadow: '0 0 25px '}} sm = {3}>
                            <div style = {{marginTop: '20%'}}>
                                <PostForm createPost = {this.createPost}/>
                                
                            </div>
                        </Col>
                        <Col sm = {9}>{this.props.post[2] ? this.props.post[2].description : null}</Col>
                    </Row>
                </Container>
        )

    }
}

const mapStateToProps = state => ({
        post: state.post
}
)

const mapDispatchToProps = {
    createPost: data => {
        return { payload: data, type: 'CREATE_POST' }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Browse)

