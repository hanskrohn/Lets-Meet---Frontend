import React from 'react'
import history from '../../history'
import styled from 'styled-components'


class User extends React.Component  {
    render(){
        console.log(this.props)
        return(
            <div style = {{paddingTop: '3%'}} > 
                <Div >
                    <div style = {{ width: '10%'}}>
                        <Img src = {this.props.user.profile_img}/>
                    </div>  
                    <div>
                        <h3 style = {{paddingTop: '25px'}}>{this.props.user.username}</h3>
                    </div>
                </Div>
            </div>
        )
    }
}

export default (User)
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
