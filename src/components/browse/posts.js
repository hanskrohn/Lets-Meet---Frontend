import React from 'react'
import history from '../../history'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'
import { connect } from 'react-redux'


class Posts extends React.Component {
    state = {
        viewDescription: false,
        user: {}
    }

    componentDidMount(){
        fetch(`http://localhost:3000/user/${this.props.item.user_id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(res => res.json())
        .then(user => {
            this.setState({
                user: user
            })
        })
    }

    handleView = () =>{
        console.log("in here")
            this.setState({
                viewDescription: !this.state.viewDescription
            })
    }
    render(){
        console.log("in psots", this.props)
        return(
        <div> 
            <CardDiv>
                <Card>
                    <Card.Header style ={{fontSize: '25px'}}>
                        <Div>
                            <div style = {{flex: '80'}}>
                                {this.props.item.title}
                            </div>
                            <div style ={{flex: '20'}}>
                                {this.state.user.profile_img}
                                {this.state.user.username}
                            </div>
                        </Div>
                    </Card.Header>
                    {this.state.viewDescription
                        ?
                        <Card.Body>
                            <Card.Text style ={{fontSize: '16px'}}>Address: {this.props.item.address}</Card.Text>
                            <Card.Text style ={{fontSize: '16px'}}>Address: {this.props.item.time}</Card.Text>
                            <Card.Text style ={{fontSize: '16px'}}>Address: {this.props.item.date}</Card.Text>
                            <div style ={{height: '2px', width: '100%', backgroundColor: '#B0B0B0'}}> </div>
                                    <div style ={{paddingTop: '1%'}}>
                                        <Div>
                                            <div style ={{flex: '33', height: '100%', fontSize: '2vh',  textAlign: 'center', paddingTop: '0.5%'}}>
                                                <i style = {{cursor: 'pointer'}} class="glyphicon glyphicon-bookmark"></i>
                                            </div>
                                            <div style ={{height: '40px', width: '2px', backgroundColor: '#B0B0B0'}}> </div>
                                            <div style ={{flex: '33', height: '100%', fontSize: '2vh',  textAlign: 'center', paddingTop: '0.5%'}}> 
                                                <i style = {{cursor: 'pointer'}} class="glyphicon glyphicon-comment"></i>    
                                            </div>
                                            <div style ={{height: '40px', width: '2px', backgroundColor: '#B0B0B0'}}> </div>
                                            <div style ={{flex: '33', textAlign: 'center', paddingTop: '0.5%'}}> 
                                                <h3  style = {{cursor: 'pointer'}} onClick = { () => this.handleView() }><strong style = {{fontSize: '15px'}}>Back</strong></h3>
                                            </div>
                                        </Div>
                                    </div>
                        </Card.Body>
                        :
                        <Card.Body>
                            <Card.Title style ={{fontSize: '16px'}}>Description:</Card.Title>
                            <Card.Text style ={{fontSize: '16px'}}>
                                {this.props.item.description}
                            </Card.Text>
                            <br></br>
                            <Card.Text style ={{fontSize: '16px'}}>
                                Spots: {this.props.item.limit}
                            </Card.Text>
                                <div style ={{height: '2px', width: '100%', backgroundColor: '#B0B0B0'}}> </div>
                                    <div style ={{paddingTop: '1%'}}>
                                        <Div>
                                            <div style ={{flex: '33', height: '100%', fontSize: '2vh',  textAlign: 'center', paddingTop: '0.5%'}}>
                                                <i style = {{cursor: 'pointer'}} class="glyphicon glyphicon-bookmark"></i>
                                            </div>
                                            <div style ={{height: '40px', width: '2px', backgroundColor: '#B0B0B0'}}> </div>
                                            <div style ={{flex: '33', height: '100%', fontSize: '2vh',  textAlign: 'center', paddingTop: '0.5%'}}> 
                                                <i style = {{cursor: 'pointer'}} class="glyphicon glyphicon-comment"></i>    
                                            </div>
                                            <div style ={{height: '40px', width: '2px', backgroundColor: '#B0B0B0'}}> </div>
                                            <div style ={{flex: '33', textAlign: 'center', paddingTop: '0.5%'}}> 
                                                <h3  style = {{cursor: 'pointer'}} onClick = { () => this.handleView() }><strong style = {{fontSize: '15px'}}>View Details</strong></h3>
                                            </div>
                                        </Div>
                                    </div>
                        </Card.Body>
                    }
                </Card>
            </CardDiv>        
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Posts)



const CardDiv = styled.div`
    border: 2px solid #ccc;
    margin: 15px;
`
const Button = styled.button`
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    float: right;
    height: 50px;
    margin-right: 3%;
    border-radius: 4px;
    border: 2px solid #ccc;
    color: #0177F9;
    transition: 0.25s all ease-out;
    &:hover {
        background-color: #0177F9; /* Green */
        color: white;
    }
`

const Div = styled.div`
    display: flex;
`
