import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import styled from 'styled-components'


const EventsPages = (props) =>  {
    const [viewingEvents, setviewingEvents] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:3000/users/events`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                }
            })
            .then(res => res.json())
            .then(data => {
                props.attendEvent(data)
                
            })
    }, [] )
    return(
        <Container style ={{maxWidth: '100%', paddingTop: '120px'}}>
            <SelectorDiv>
                <EventsDiv onClick={ () => setviewingEvents(true)}>
                    {viewingEvents
                        ?
                        <div>
                            <strong>View Events</strong>
                            <div style ={{height: '2px', width: '80%', backgroundColor: '#B0B0B0', marginLeft: '10%', marginTop: '1%'}}> </div>
                        </div>
                        :
                        <div>View Events</div>
                    }
                </EventsDiv>
                <div style ={{height: '50px', width: '2px', backgroundColor: '#B0B0B0', paddingTop: '-15px'}}> </div>
                <CommentsDiv onClick={ () => setviewingEvents(false)}>
                    {viewingEvents
                            ?
                            <div>Post Comments</div>
                            :
                            <div>
                                <strong>Post Comments</strong>
                                <div style ={{height: '2px', width: '80%', backgroundColor: '#B0B0B0', marginLeft: '10%', marginTop: '1%'}}> </div>
                            </div>
                    }
                </CommentsDiv>
            </SelectorDiv> 
            {props.posts.length !== 0
                ? 
                <DisplayDiv>not 0</DisplayDiv>
                :
                <div style = {{textAlign: 'center', fontSize: '400%', marginTop: '15%'}}>
                    Currently Not Attending Any Event
                </div>
            }
        </Container>
    )

    
}

const mapStateToProps = state => ({
    posts: state.postsAttending
})


const mapDispatchToProps ={
    getUser: data => {
        return {type: 'GET_USERS', payload: data}
    },
    attendEvent: data => {
        return { payload: data, type: 'POST_ATTENDING'}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EventsPages)

const Search = styled.input`
    width: 90%;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    resize: none;
    margin-bottom: 5px;
    margin-left: 5%;
    margin-right: 5%;
   
`
const SelectorDiv = styled.div`
    display: flex;
`
const EventsDiv = styled.div`
    flex: 50;
    text-align: center;
    font-size: 25px;
    cursor: pointer;
`

const CommentsDiv = styled.div`
    flex: 50;
    text-align: center;
    font-size: 25px;
    cursor: pointer;
`
const DisplayDiv = styled.div`
    border: 2px solid #ccc;
    margin-top: 2%;
    margin-bottom: 2%;
    margin-left: 7%;
    margin-right: 7%;
`