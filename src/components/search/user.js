import React from 'react'
import history from '../../history'
import styled from 'styled-components'


class User extends React.Component  {
    render(){
        console.log(" this is the props" , this.props)
        return(
            
                 <div style = {{paddingTop: '3%'}} > 
                    <Div >
                        <div style = {{ width: '10%'}}>
                            <Img src = {this.props.user.profile_img}/>
                        </div>  
                        <NameDiv>
                            <div style = {{cursor: 'pointer'}} onClick = { () => history.push(`/users/${this.props.user.id}`)}> 
                                <h3 style = {{paddingTop: '25px'}}>{this.props.user.username}</h3>
                            </div>
                        </NameDiv>
                        <div style = {{marginLeft: '550px', paddingTop: '10px' }}>
                            <Button onClick = {() => this.props.follow(this.props.user)} style = {{outline: 'none'}} ><strong style = {{fontSize: '15px'}}>Follow</strong></Button>
                        </div>
                    </Div>
                </div>
      
        )
    }
}

export default (User)
const NameDiv = styled.div`
    width: 500px;
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
    padding-left: 20px;
    padding-right: 20px;
    
    &:hover {
        background-color: #0177F9; /* Green */
        color: white;
    }
`
const Div = styled.div`
    width: 86%;
    margin-left: 7%;
    margin-right: 7%;
    height: 75px;
    border: 2px solid #ccc;
    display: flex;
`

const Img = styled.img`
    padding: 15px;
    height: 100%;
   

`
