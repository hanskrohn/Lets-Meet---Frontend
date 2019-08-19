import React, {useState, useEffect}  from 'react'
import history from '../../history'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect } from 'react-redux'
import Comment from '../post/comment.js'


const createPost = (e, setComments, comments, props) => {
    e.preventDefault()
    let id = props.match.params.id
    const data = {
        "comment": e.target["comment"].value
    }
    document.getElementById("comment").reset()
    fetch(`http://localhost:3000/comment/${id}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(newComment => {
        setComments([...comments, newComment])
    })
}

const EventsShowPage = (props) =>  {
    const [post, setPost] = useState({})
    const [user, setUser] = useState({})
    const [comments, setComments] = useState([])

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

        fetch(`http://localhost:3000/post/comments/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(res => res.json())
        .then(comments => {
            setComments(comments)  
        })
        
    }, [])

    console.log(" in show", post)
    return(
        <div style = {{paddingTop: '120px', paddingBottom: '20px'}}>
            <MainDiv>
                <PostDiv>
                    <div style = {{flex: '3', fontSize: '250%', paddingLeft: '5%', paddingTop: '8px'}} onClick = {() => history.goBack()}>
                        <i class="glyphicon glyphicon-arrow-left"></i>
                    </div>
                    <div style = {{flex: '94', textAlign: 'center'}}>
                        <h1 style = {{ marginTop: '15px'}}><strong>{post.title}</strong></h1>
                    </div>
                    <div style = {{flex: '3'}}>

                    </div>
                </PostDiv>
                <div style ={{height: '2px', width: '95%', backgroundColor: '#B0B0B0', marginLeft: '2%'}}> </div>
                <Div>
                    <div style = {{flex: '40'}}>
                        <div style = {{ height: '86%', marginTop: '5%', marginBottom: '7%', marginLeft: '20%', marginRight: '20%'}}>
                            <div style = {{textAlign: 'center', marginLeft: '27%', marginRight: '27%'}}>
                                <div>
                                    <img style = {{height: '17vh', width: '100%'}} src = {user.profile_url} ></img>
                                </div>
                                <div style = {{ marginTop: '10%', marginBottom: '25%'}}>
                                    <h2 style = {{fontSize: '350%'}}><strong>{user.username}</strong></h2>
                                </div>
                            </div>
                            <div style = {{ paddingLeft: '5%', fontSize: '250%'}}>
                                <p>Address: {post.address}</p>
                                <p>Date: {post.date}</p>
                                <p>Time: {post.time}</p>
                            </div>
                            
                        </div>

                    </div>
                    <div style ={{height: '65vh', width: '2px', backgroundColor: '#B0B0B0', marginTop: '3vh'}}> </div>
                    <div style = {{flex: '60'}}>
                    <CommentsDiv> 
                        <div style ={{width: '100%'}}>
                            {comments.map((comment) => < Comment comment = {comment}/>)}
                        </div>
                    </CommentsDiv>
                    <div style ={{height: '2px', width: '95%', backgroundColor: '#B0B0B0', marginLeft: '2%'}}> </div>
                    <FormDiv>
                        <form id="comment"  onSubmit = {(e) => createPost(e, setComments, comments, props)} class="comment" action="action_page.php">
                            <input type="text" placeholder="Comment" name="comment"></input>
                            <button type="submit">
                                Post
                            </button>
                        </form>
                    </FormDiv>
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
    display: flex;
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
