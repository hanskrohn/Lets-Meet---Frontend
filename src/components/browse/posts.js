import React from 'react'
import history from '../../history'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'



class Posts extends React.Component {
    state = {
        viewDescription: false
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
                    <Card.Header style ={{fontSize: '25px'}}>{this.props.item.title}</Card.Header>
                    {this.state.viewDescription
                        ?
                        <Card.Body>
                            <Card.Text style ={{fontSize: '16px'}}>Address: {this.props.item.address}</Card.Text>
                            <Card.Text style ={{fontSize: '16px'}}>Address: {this.props.item.time}</Card.Text>
                            <Card.Text style ={{fontSize: '16px'}}>Address: {this.props.item.date}</Card.Text>
                            <Button onClick = { () => this.handleView() } className = "float-right" style = {{paddingLeft: '4%', paddingRight: '4%'}} ><strong style = {{fontSize: '15px'}}>Back</strong></Button>
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
                            
                            <Button onClick = { () => this.handleView() }className = "float-right" variant="primary"><strong style = {{fontSize: '15px'}}>View Details</strong></Button>
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
export {Posts}