import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {Profile} from '../currentUser/profile.js'
import Posts from '../post/posts.js'

const ProfilePage = (props) => {
    const [chosenUser, setchosenUser] = useState({})
    const [chosenUserFollowers, setchosenUserFollowers] = useState([])
    const [chosenUserFollowing, setchosenUserFollowing] = useState([])
    const [chosenUserPost, setchosenUserPost] = useState([])

    useEffect(() => {
        let id = props.match.params.id
        console.log(id)
        fetch(`http://localhost:3000/user/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(res => res.json())
        .then(user => {
            setchosenUser(user)
        })


        fetch(`http://localhost:3000/post/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(res => res.json())
        .then(post =>{
            setchosenUserPost(post)
        })

        fetch(`http://localhost:3000/followers/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(res => res.json())
        .then(followers =>{
            setchosenUserFollowers(followers)
        })
        
        fetch(`http://localhost:3000/following/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(res => res.json())
        .then(following =>{
            setchosenUserFollowing(following)
        })
    }, [chosenUser.id])

        return(
                <Container style ={{maxWidth: '100%'}}>
                    <Row style={{height: '90vh'}}>
                        <Col style = {{padding: '0'}} sm = {3}>
                        <DivStyle>
                        <Profile user = {chosenUser}/>
                        </DivStyle>   
                        </Col>
                        <Col sm = {9}>
                            <Hub> 
                                <Row >
                                    <Col >
                                        <div style = {{paddingTop: '100px', paddingLeft: '40%', cursor: 'pointer' }}>
                                            <div style = {{fontSize: '75px'}}>
                                                <strong>{chosenUserPost.length}</strong>
                                            </div>
                                            <div style = {{fontSize: '25px'   }}>
                                                <strong>Post</strong>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col >
                                        <div style = {{paddingTop: '100px', paddingLeft: '30%', cursor: 'pointer' }}>
                                            <div style = {{fontSize: '75px'}}>
                                                <strong>{chosenUserFollowers.length}</strong>
                                            </div>
                                            <div style = {{fontSize: '25px' }}>
                                                <strong>Followers</strong>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col >
                                        <div style = {{paddingTop: '100px', paddingLeft: '25%', cursor: 'pointer' }}>
                                            <div style = {{fontSize: '75px'}}>
                                                <strong>{chosenUserFollowing.length}</strong>
                                            </div>
                                            <div style = {{fontSize: '25px' }}>
                                                <strong>Following</strong>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Hub>
                            <PostContainer>
                                {chosenUserPost ? chosenUserPost.map((post) => <Posts item = {post}/> ) : null}
                            </PostContainer>
                        </Col>
                    </Row>
                </Container>
        )

    }


const mapStateToProps = state => ({
    chosenUser: state.chosenUser,
    chosenUserPost: state.chosenUserPost
})

const mapDispatchToProps = {
    setUser: data => {
        return { payload: data, type: 'SET_USER'}
    },
    getFollowers: data => {
        return { payload: data, type: 'USER_FOLLOWERS' }
    },
    getFollowing : data => {
        return { payload: data, type: 'USER_FOLLOWING' }
    },
    getPost: data => {
        return {type: 'CHOSEN_USER_POST', payload: data}
    }
    
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)

const PostContainer = styled.div`
    padding-top: 310px;
`

const DivStyle = styled.div`
    resize: none;
    box-shadow: 0 0 25px;
    position: fixed;
    width: 25%;
    top: 0;
    height: 100%;

`
const Hub = styled.div`
    height: 300px;
    position: absolute;
    box-shadow: 0 0 25px;
    width: 70%;
    margin-left: 15%;
    margin-right: 15%;
    z-index: 2;
    background: white;
`


