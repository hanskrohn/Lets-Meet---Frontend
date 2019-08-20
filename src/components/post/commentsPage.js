import React, {useState, useEffect} from 'react'
import Comment from './comment.js'
import { connect } from 'react-redux'
import styled from 'styled-components'
import history from '../../history.js'
import './comments.css'


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

const CommentsPage = (props) => {
    const [post, setPost] = useState({})
    const [postUser, setpostUser] = useState({})
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
                setpostUser(user)   
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
        
    }, [ post.id ] )
    
    console.log(history)
    return(
        <div style = {{paddingTop: '120px', paddingBottom: '20px'}}>
            <MainDiv>
                <PostDiv>
                    <div style = {{flex: '3', fontSize: '250%', paddingLeft: '5%', paddingTop: '8px'}} onClick = {() => history.goBack()}>
                        <i class="glyphicon glyphicon-arrow-left"></i>
                    </div>
                    <div style = {{flex: '67', fontSize: '250%', paddingLeft: '5%', paddingTop: '8px'}}>
                        <strong>{post.title}</strong>
                    </div>
                    <div style = {{flex: '10', paddingTop: '8px'}}>
                        <img style = {{height: '35px', width: '35px', float: 'right'}} src = {postUser.profile_url}></img>
                    </div>
                    <div style ={{flex: '20', fontSize: '250%', paddingTop: '8px', paddingLeft: '5px'}}>
                        <strong>{postUser.username}</strong>
                    </div>
                </PostDiv>
                <div style ={{height: '2px', width: '95%', backgroundColor: '#B0B0B0', marginLeft: '2%'}}> </div>
                <CommentsDiv> 
                    <div style ={{width: '100%'}}>
                        {comments.map((comment) => < Comment comment = {comment}/>)}
                    </div>
                </CommentsDiv>
                <div style ={{height: '2px', width: '95%', backgroundColor: '#B0B0B0', marginLeft: '2%'}}> </div>
                <FormDiv>
                    <form id="comment" onSubmit = {(e) => createPost(e, setComments, comments, props)} class="comment" action="action_page.php">
                        <input type="text" placeholder="Comment" name="comment" required></input>
                        <button type="submit">
                            Post
                        </button>
                    </form>
                </FormDiv>
            </MainDiv>
        </div>
    )
}

const mapStateToProps = state => ({
    post: state.post,
    currentUser: state.currentUser
})



export default connect(mapStateToProps)(CommentsPage)


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




