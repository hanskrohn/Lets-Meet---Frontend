import React from 'react'
import './profile.css'
import history from '../../history'
import styled from 'styled-components'

const Profile = (props) => {
    return(
        
        <div style ={{paddingLeft: '5%'}}> 
            <Div>
                <div class = "textWithBlurredBg format"> 
                    <img src = {props.user.profile_img} ></img>
                    <button style={{textAlign: 'center', fontSize: '150%'}} class = "btn" > 
                            EDIT 
                    </button>    
                </div>
                <br></br>
                <div>
                    <h1 style = {{fontSize: '400%'}}>{props.user.username}</h1>
                </div>
                <br></br>
                <div>
                    <h4>{props.user.name}</h4>
                </div>
                <br></br>
                <div>
                    <h4>{props.user.email}</h4>
                </div>
                <br></br>
                <div>
                    <h4>{props.user.country}</h4>
                </div>
                <br></br>
                <div>
                    <h4>{props.user.city}</h4>
                </div>
                <br></br>
                <div>
                    <h5>{props.user.bio}</h5>
                </div>
            </Div>
        </div>
    )
}

const Div = styled.div`
    resize: none;
    height: 530px;
    position: fixed;
    width: 22%;
    top: 13%;
    
`
export {Profile}