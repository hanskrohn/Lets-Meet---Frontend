import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Profile from './profile.js'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Posts from '../post/posts.js'
import history from '../../history.js'

const ProfilePage = (props) => {
    useEffect(() => {
        if (props.currentUser) {
            fetch(`http://localhost:3000/followers/${props.currentUser.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(user => {
                    props.getFollowers(user)
                })

            fetch(`http://localhost:3000/following/${props.currentUser.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(user => {
                    props.getFollowing(user)
                })

            fetch(`http://localhost:3000/post/${props.currentUser.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(post => {
                    props.getPost(post)
                })
        }
    }, [ props.currentUser.id ])

    return (
        <div>
                {localStorage.getItem('token')
                    ?
                    <Container style={{ maxWidth: '100%' }}>
                        <Row style={{ height: '90vh' }}>
                            <Col style={{ padding: '0' }} sm={3}>
                                <DivStyle>
                                    <Profile user={props.currentUser} />
                                    <SignOut>
                                        <Btn  onClick={() => {
                                            localStorage.clear()
                                            window.location = '/sign-in'}
                                        }>
                                            <h3><strong>Sign-Out</strong></h3>
                                        </Btn>
                                    </SignOut>
                                </DivStyle>
                            </Col>
                            <Col sm={9}>
                                <Hub>
                                    <Row >
                                        <Col style = {{flex: '40', padding: '0'}}>
                                            <div style={{ paddingTop: '100px', textAlign: 'center' }}>
                                                <div style={{ fontSize: '75px' }}>
                                                    <strong>{props.usersPost.length}</strong>
                                                </div>
                                                <div >
                                                    <h1 style={{ fontSize: '20px' }}><strong>Post</strong></h1>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col style = {{flex: '20', padding: '0'}} >
                                            <div style={{ paddingTop: '100px', cursor: 'pointer', textAlign: 'center'  }} onClick={() => history.push(`/followers/${props.currentUser.id}`)}>
                                                <div style={{ fontSize: '75px' }}>
                                                    <strong>{props.followers.length}</strong>
                                                </div>
                                                <div >
                                                    <h1 style={{ fontSize: '20px' }}><strong>Followers</strong></h1>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col style = {{flex: '40', padding: '0'}}>
                                            <div style={{ paddingTop: '100px', cursor: 'pointer', textAlign: 'center'  }} onClick={() => history.push(`/following/${props.currentUser.id}`)}>
                                                <div style={{ fontSize: '75px' }}>
                                                    <strong>{props.following.length}</strong>
                                                </div>
                                                <div >
                                                    <h1 style={{ fontSize: '20px' }}><strong>Following</strong></h1>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Hub>
                                <PostContainer>
                                    {props.usersPost.length !== 0 ? props.usersPost.map((post) => <Posts item={post} />) : <div style = {{textAlign: 'center', marginTop: '20%', fontSize: '200%'}}>See your Posts here </div>}
                                </PostContainer>
                            </Col>
                        </Row>
                    </Container>
                     :
                     <div>
                         {history.push('/sign-in')}
                     </div>
                 }
                 </div>
    )
}

const mapStateToProps = state => ({
    usersPost: state.usersPost,
    currentUser: state.currentUser,
    followers: state.followers,
    following: state.following,
})

const mapDispatchToProps = {
    getFollowers: data => {
        return { payload: data, type: 'GET_FOLLOWERS' }
    },
    getFollowing: data => {
        return { payload: data, type: 'GET_FOLLOWING' }
    },
    getPost: data => {
        return { payload: data, type: 'USERS_POST' }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)

const PostContainer = styled.div`
    padding-top: 310px;
`
const SignOut = styled.div`
    border: 2px solid #ccc;
    position: absolute;
    bottom: 0;
    height: 50px;
    width: 100%;
`
const Btn = styled.button`
    height: 50px;
    margin-right: 3%;
    background-color: white;
    color: #000;
    width: 100%;
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
    height: 285px;
    position: absolute;
    box-shadow: 0 0 25px;
    width: 70%;
    margin-left: 15%;
    margin-right: 15%;
    z-index: 0;
    background: white;
`


