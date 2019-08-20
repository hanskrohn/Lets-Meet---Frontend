
import React, {useState, useEffect} from 'react'
import history from '../../history'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'
import { connect } from 'react-redux'

const handleView = ( setviewDescription, viewDescription) =>{
    setviewDescription(!viewDescription)
}

const attend = (props, setLimit, limit, setAttending, attending) =>{
    fetch(`http://localhost:3000/attend/${props.item.id}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
    })
    .then(res => res.json())
    .then(post => {
        if(post.message === "Now Attending"){
            setLimit(limit-1)
            setAttending(!attending)
            props.attendEvent(post.event)
        }
        else if(post.message === "Already Attending"){
            props.unattendEvent(post.event)
            fetch(`http://localhost:3000/unattend/${props.item.id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                }
            })
            .then(setAttending(!attending), setLimit(limit+1) )
                
        }
        else if(post.message === "Not enough space"){
            alert("Not enough space")
        }


        
    })
   
}

const Posts = (props) => {
   

    const [viewDescription, setviewDescription] = useState(false)
    const [user, setUser] = useState({})
    const [limit, setLimit] = useState(0)
    const [attending, setAttending] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:3000/user/${props.item.user_id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(res => res.json())
        .then(user => {
            setUser(user)
            setLimit(props.item.limit)
            fetch(`http://localhost:3000/attending/${props.item.id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.message === "true"){
                    setAttending(true)
                }
                else if(data.message === "false") {
                    setAttending(false)
                }

            })
        })
    }, [ props.item.id] )



        
        return(
        <div> 
            <CardDiv>
                <Card>
                    <Card.Header style ={{fontSize: '25px'}}>
                        <Div>
                            <div style = {{flex: '70'}}>
                                {props.item.title}
                            </div>
                            <div style ={{flex: '10', paddingTop: '3px'}}>
                                <img style = {{height: '35px', width: '35px',float: 'right'}} src = {user.profile_url}></img>
                            </div>
                            <div style ={{flex: '20', paddingLeft: '10px'}}>
                                {user.username}
                            </div>
                        </Div>
                    </Card.Header>
                    {viewDescription
                        ?
                        <Card.Body>
                            <Card.Text style ={{fontSize: '16px'}}>Address: {props.item.address}</Card.Text>
                            <Card.Text style ={{fontSize: '16px'}}>Address: {props.item.time}</Card.Text>
                            <Card.Text style ={{fontSize: '16px'}}>Address: {props.item.date}</Card.Text>
                            <div style ={{height: '2px', width: '100%', backgroundColor: '#B0B0B0'}}> </div>
                                    <div style ={{paddingTop: '1%'}}>
                                        <Div>
                                            <div style ={{flex: '33', height: '100%', fontSize: '2vh',  textAlign: 'center', paddingTop: '0.5%', cursor: 'pointer'}}  onClick = {() => attend(props, setLimit, limit, setAttending, attending)}>
                                            {attending
                                                    ?
                                                    <i style = {{ color: 'red'}} class="glyphicon glyphicon-bookmark"></i>
                                                    :
                                                    <i  class="glyphicon glyphicon-bookmark"></i>
                                                }
                                            </div>
                                            <div style ={{height: '40px', width: '2px', backgroundColor: '#B0B0B0'}}> </div>
                                            <div style ={{flex: '33', height: '100%', fontSize: '2vh',  textAlign: 'center', paddingTop: '0.5%', cursor: 'pointer'}} onClick = {() => history.push(`/comments/post/${props.item.id}`)}> 
                                                <i   class="glyphicon glyphicon-comment"></i>    
                                            </div>
                                            <div style ={{height: '40px', width: '2px', backgroundColor: '#B0B0B0'}}> </div>
                                            <div style ={{flex: '33', textAlign: 'center', paddingTop: '0.5%', cursor: 'pointer'}}  onClick = { () => handleView( setviewDescription, viewDescription) }> 
                                                <h3  ><strong style = {{fontSize: '15px'}}>Back</strong></h3>
                                            </div>
                                        </Div>
                                    </div>
                        </Card.Body>
                        :
                        <Card.Body>
                            <Card.Title style ={{fontSize: '16px'}}>Description:</Card.Title>
                            <Card.Text style ={{fontSize: '16px'}}>
                                {props.item.description}
                            </Card.Text>
                            <br></br>
                            <Card.Text style ={{fontSize: '16px'}}>
                                Spots: {limit}
                            </Card.Text>
                                <div style ={{height: '2px', width: '100%', backgroundColor: '#B0B0B0'}}> </div>
                                    <div style ={{paddingTop: '1%'}}>
                                        <Div>
                                            <div style ={{flex: '33', height: '100%', fontSize: '2vh',  textAlign: 'center', paddingTop: '0.5%', cursor: 'pointer'}} onClick = {() => attend(props, setLimit, limit, setAttending, attending)} >
                                                {attending
                                                    ?
                                                    <i style = {{ color: 'red'}} class="glyphicon glyphicon-bookmark"></i>
                                                    :
                                                    <i  class="glyphicon glyphicon-bookmark"></i>
                                                }
                                            </div>
                                            <div style ={{height: '40px', width: '2px', backgroundColor: '#B0B0B0'}}> </div>
                                            <div style ={{flex: '33', height: '100%', fontSize: '2vh',  textAlign: 'center', paddingTop: '0.5%', cursor: 'pointer'}} onClick = {() => history.push(`/comments/post/${props.item.id}`)}> 
                                                <i class="glyphicon glyphicon-comment"></i>    
                                            </div>
                                            <div style ={{height: '40px', width: '2px', backgroundColor: '#B0B0B0'}}> </div>
                                            <div style ={{flex: '33', textAlign: 'center', paddingTop: '0.5%', cursor: 'pointer'}} onClick = { () => handleView( setviewDescription, viewDescription) }> 
                                                <h3  ><strong style = {{fontSize: '15px'}}>View Details</strong></h3>
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
    


const mapStateToProps = state => ({
    post: state.post,
    currentUser: state.currentUser
})

const mapDispatchToProps = {
createPost: data => {
    return { payload: data, type: 'CREATE_POST' }
},
getPost: data => {
    return { payload: data, type: 'GET_POST'}
},
attendEvent: data => {
    return { payload: data, type: 'ATTEND_POST'}
},
unattendEvent: data => {
    return { payload: data, type: 'UNATTEND_POST'}
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
