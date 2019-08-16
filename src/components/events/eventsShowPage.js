import React, {useState, useEffect}  from 'react'
import history from '../../history'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect } from 'react-redux'

const EventsShowPage = (props) =>  {
    const [post, setPost] = useState({})
    const [user, setUser] = useState({})

    useEffect(() => {
        let id = props.match.params.id
        fetch(`http://localhost:3000/comment/post/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(res => res.json())
        .then(post => {
            setPost(post) 
            fetch(`http://localhost:3000/user/${post.user_id}`,{
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
        })
        
    }, [])

    console.log(" in show", post)
    return(
        <div style = {{paddingTop: '120px', paddingBottom: '20px'}}>
            <MainDiv>
                <PostDiv>
                    <h1 style = {{ marginTop: '15px'}}><strong>{post.title}</strong></h1>
                </PostDiv>
                <div style ={{height: '2px', width: '95%', backgroundColor: '#B0B0B0', marginLeft: '2%'}}> </div>
                <Div>
                    <div style = {{flex: '40'}}>
                        <div style = {{border: '2px solid red', height: '86%', marginTop: '5%', marginBottom: '7%', marginLeft: '20%', marginRight: '20%'}}>
                            <div style = {{textAlign: 'center', marginLeft: '27%', marginRight: '27%'}}>
                                <div>
                                    <img style = {{height: '17vh', width: '100%'}} src = {user.profile_img} ></img>
                                </div>
                                <div>
                                    {user.username}
                                </div>
                            </div>
                            
                        </div>

                    </div>
                    <div style ={{height: '65vh', width: '2px', backgroundColor: '#B0B0B0', marginTop: '3vh'}}> </div>
                    <div style = {{flex: '60'}}>
                        
                    </div>
                </Div>
            </MainDiv>
        </div>
    )
}



export default (EventsShowPage)

const MainDiv = styled.div`
    box-shadow: 25px 25px 10px 0 rgba(0,0,0,0.4), 0 0 0 0 rgba(0,0,0,0.3);
    width: 86%;
    border-radius: 10px;
    margin-left: 7%;
    margin-right: 7%;
    min-height: 80vh;
    border: 2px solid #ccc;    
`

const PostDiv = styled.div`
    height: 5vh;
    width: 100%;
    text-align: center;
`

const CommentsDiv = styled.div`
    height: 65vh;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
`
const FormDiv = styled.div`
    padding-top: 1%;
    padding-left: 9%;
`
const Div = styled.div`
    display: flex;
    min-height: 73vh;
`