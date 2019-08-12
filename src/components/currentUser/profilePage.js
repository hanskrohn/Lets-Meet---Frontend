import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Profile } from './profile.js'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { UserPosts } from './userPosts.js'
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
                .then(user => {
                    props.getPost(user)
                })
        }
    }, [ props.currentUser.id ])

    return (
        <Container style={{ maxWidth: '100%' }}>
            <Row style={{ height: '90vh' }}>
                <Col style={{ padding: '0' }} sm={3}>
                    <DivStyle>
                        <Profile user={props.currentUser} />
                    </DivStyle>
                </Col>
                <Col sm={9}>
                    <Hub>
                        <Row >
                            <Col >
                                <div style={{ paddingTop: '120px', paddingLeft: '40%' }}>
                                    <div style={{ fontSize: '75px' }}>
                                        <strong> 16</strong>
                                    </div>
                                    <div style={{ fontSize: '25px' }}>
                                        <strong>Post</strong>
                                    </div>
                                </div>
                            </Col>
                            <Col >
                                <div style={{ paddingTop: '120px', paddingLeft: '30%', cursor: 'pointer' }} onClick={() => history.push('/followers')}>
                                    <div style={{ fontSize: '75px' }}>
                                        <strong>{props.followers.length > 0 ? props.followers.length : 0}</strong>
                                    </div>
                                    <div style={{ fontSize: '25px' }}>
                                        <strong>Followers</strong>
                                    </div>
                                </div>
                            </Col>
                            <Col >
                                <div style={{ paddingTop: '120px', paddingLeft: '25%', cursor: 'pointer' }} onClick={() => history.push('/following')}>
                                    <div style={{ fontSize: '75px' }}>
                                        <strong>{props.following.length > 0 ? props.following.length : 0}</strong>
                                    </div>
                                    <div style={{ fontSize: '25px' }}>
                                        <strong>Following</strong>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Hub>
                    <PostContainer>
                        {props.usersPost ? props.usersPost.map((post) => <UserPosts post={post} />) : null}
                    </PostContainer>
                </Col>
            </Row>
        </Container>
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
        return { payload: data, type: 'USERS_POSTS' }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)

const PostContainer = styled.div`
    padding-top: 320px;
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


