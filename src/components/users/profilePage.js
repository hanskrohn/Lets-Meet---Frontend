import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Profile} from './profile.js'
import { connect } from 'react-redux'



class ProfilePage extends React.Component {
    render(){
        console.log(this.props)
        return(
                <Container style ={{maxWidth: '100%'}}>
                    <Row style={{height: '90vh'}}>
                        <Col style ={{boxShadow: '0 0 25px '}} sm = {3}>
                            <div style = {{marginTop: '20%'}}>
                                <Profile user = {this.props.currentUser}/>
                            </div>
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