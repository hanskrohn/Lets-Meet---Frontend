import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import './comments.css'


const Comment = (props) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        fetch(`http://localhost:3000/user/${props.comment.user_id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(res => res.json())
        .then(user => {
            setUser(user)
        })
    }, [props.comment.user_id] )
  
    return(
        <div>
            <CardDiv>
                <div >
                    <img style = {{height: '45px', width: '45px', float: 'right'}} src = {user.profile_url}></img>
                </div>
                <div style ={{ fontSize: '150%', paddingLeft: '1%'}}>
                    <strong>{user.username}:</strong>
                </div>
                <div style ={{ fontSize: '150%', paddingLeft: '1%'}}>
                    {props.comment.comment}
                </div>
                
            </CardDiv>
        </div>
    )
}

export default (Comment)

const CardDiv = styled.div`
    margin-top: 15px;
    margin-left: 5%;
    margin-right: 5%;
    display: flex;
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







