import React, {useState, useEffect}  from 'react'
import history from '../../history'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'

const Events = (props) =>  {
    const [user, setUser] = useState({})
    useEffect(() => {
        fetch(`http://localhost:3000/user/${props.event.user_id}`,{
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
    }, [])
    console.log(props)
    return(
        <CardDiv style = {{ cursor: 'pointer' }} onClick = { () => history.push(`/event/show/${props.event.id}`)}>
            <Card>
                <Card.Header style ={{fontSize: '25px'}}>
                    <Div>
                        <div style = {{ flex: '70', marginLeft: '5%' , paddingTop: '5px'}}>
                            <h2>{props.event.title}</h2>
                        </div>
                        <div style = {{ flex: '10' }}>
                            <img style = {{height: '35px', float: 'right'}} src = {user.profile_url}></img>
                        </div>
                        <div style = {{ flex : '20' , paddingLeft: '5px', paddingTop: '5px'}}>
                            <h2>{user.username}</h2>
                        </div>
                    </Div>
                </Card.Header>
                <Card.Body>
                    <Div style = {{ fontSize: '120%' }}>
                        <div style = {{ flex: '33', textAlign: 'center' }}>
                            <p>Address: {props.event.address}</p>
                        </div>
                        <div style = {{ flex: '33', textAlign: 'center' }}>
                            <p>Date: {props.event.date}</p>
                        </div>
                        <div style = {{ flex: '33', textAlign: 'center' }}>
                            <p>Time: {props.event.time}</p>
                        </div>
                    </Div>
                </Card.Body>
            </Card>
        </CardDiv>
    )
}

export default Events

const Div = styled.div`
    display: flex;
`
const CardDiv = styled.div`
    border: 2px solid #ccc;
    margin: 15px;
`