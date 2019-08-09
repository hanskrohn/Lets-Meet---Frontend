import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Profile} from './profile.js'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {UserPosts} from './userPosts.js'

class ProfilePage extends React.Component {
    render(){
        console.log(this.props)
        return(
                <Container style ={{maxWidth: '100%'}}>
                    <Row style={{height: '90vh'}}>
                        <Col style = {{padding: '0'}} sm = {3}>
                        <DivStyle>
                                <Profile user = {this.props.currentUser}/>
                        </DivStyle>   
                        </Col>
                        <Col sm = {9}>
                            <Hub> 
                                <Row >
                                    <Col >
                                        <div style = {{paddingTop: '120px', marginLeft: '90px'}}>
                                            <div style = {{fontSize: '75px'}}>
                                                <strong> 16</strong>
                                            </div>
                                            <div style = {{fontSize: '25px',  marginLeft: '15px' }}>
                                                <strong>Post</strong>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col >
                                        <div style = {{paddingTop: '120px', marginLeft: '60px'}}>
                                            <div style = {{fontSize: '75px'}}>
                                                <strong> 16</strong>
                                            </div>
                                            <div style = {{fontSize: '25px',  marginLeft: '-9px' }}>
                                                <strong>Followers</strong>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col >
                                        <div style = {{paddingTop: '120px', marginLeft: '30px'}}>
                                            <div style = {{fontSize: '75px'}}>
                                                <strong> 16</strong>
                                            </div>
                                            <div style = {{fontSize: '25px',  marginLeft: '-7px' }}>
                                                <strong>Following</strong>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Hub>
                            <PostContainer>
                                {this.props.post ? this.props.post.map((post) => <UserPosts post = {post}/> ) : null}
                            </PostContainer>
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



export default connect(mapStateToProps)(ProfilePage)

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