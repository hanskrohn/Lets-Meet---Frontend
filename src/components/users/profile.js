import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



class Profile extends React.Component {
    state = {

    }
    render(){
        return(
                <Container style ={{maxWidth: '100%'}}>
                    <Row style={{height: '90vh'}}>
                        <Col style ={{boxShadow: '0 0 25px '}} sm = {3}>
                            <div style = {{marginTop: '20%'}}>
                                
                            </div>
                        </Col>
                        <Col sm = {9}>2 of 2</Col>
                    </Row>
                </Container>
        )

    }
}
export default Profile