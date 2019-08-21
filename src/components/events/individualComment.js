import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'


const IndividualComment = (props) =>  {
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
        <CardDiv>
            <Div>
                <Img src = {user.profile_url}></Img>
                <div style = {{display: 'inline-block', verticalAlign: 'middle'}}>
                    <p style = {{fontSize: '15px', float: 'left'}}>{user.username} commented: {props.comment.comment}</p>
                </div>
            </Div>
        </CardDiv>
    )
}

export default IndividualComment

const cardHeight = 85

const CardDiv = styled.div`
    display: flex;   
`
const Div = styled.div`
    width: 99%;
    margin: 1%;
    height: ${cardHeight}px;
    border: 2px solid #ccc;
`
const Img = styled.img`
    padding: 15px;
    height: ${cardHeight}px;
    width: ${cardHeight}px;

`