import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Profile} from './profile.js'
import { connect } from 'react-redux'
import styled from 'styled-components'


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
                        <Col sm = {9}>2 of 2</Col>
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

const DivStyle = styled.div`
    resize: none;
    box-shadow: 0 0 25px;
    position: fixed;
    width: 25%;
    top: 0;
    height: 100%;

`