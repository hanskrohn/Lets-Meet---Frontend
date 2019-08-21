import React from 'react'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'



class UserPosts extends React.Component {
    state = {
        viewDescription: false
    }

    handleView = () =>{
            this.setState({
                viewDescription: !this.state.viewDescription
            })
    }
    render(){
        return(
        <div> 
            <CardDiv>
                <Card>
                    <Card.Header style ={{fontSize: '25px'}}>{this.props.post.title}</Card.Header>
                    {this.state.viewDescription
                        ?
                        <Card.Body>
                            <Card.Text style ={{fontSize: '16px'}}>Address: {this.props.post.address}</Card.Text>
                            <Card.Text style ={{fontSize: '16px'}}>Address: {this.props.post.time}</Card.Text>
                            <Card.Text style ={{fontSize: '16px'}}>Address: {this.props.post.date}</Card.Text>
                            <Button onClick = { () => this.handleView() } className = "float-right" style = {{paddingLeft: '4%', paddingRight: '4%'}} ><strong style = {{fontSize: '15px'}}>Back</strong></Button>
                        </Card.Body>
                        :
                        <Card.Body>
                            <Card.Title style ={{fontSize: '16px'}}>Description:</Card.Title>
                            <Card.Text style ={{fontSize: '16px'}}>
                                {this.props.post.description}
                            </Card.Text>
                            <br></br>
                            <Card.Text style ={{fontSize: '16px'}}>
                                Spots: {this.props.post.limit}
                            </Card.Text>
                            <div>
                                <Button onClick = { () => this.handleView() }className = "float-right" variant="primary"><strong style = {{fontSize: '15px'}}>View Details</strong></Button>
                            </div>
                        </Card.Body>
                    }
                </Card>
            </CardDiv>        
        </div>
        )
    }
    
}

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
export {UserPosts}