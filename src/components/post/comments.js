import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import './comments.css'



const Comments = (props) => {
    const [post, setPost] = useState({})
    const [postUser, setpostUser] = useState({})

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

        
    }, [ post ] )
    

    return(
        <div style = {{paddingTop: '120px', paddingBottom: '20px'}}>
            <MainDiv>
                <PostDiv>
                    <div style = {{flex: '80', fontSize: '250%', paddingLeft: '5%', paddingTop: '8px'}}>
                        <strong>{post.title}</strong>
                    </div>
                    <div style ={{flex: '20', fontSize: '250%', paddingTop: '8px'}}>
                        <strong>{postUser.username}</strong>
                    </div>
                </PostDiv>
                <div style ={{height: '2px', width: '95%', backgroundColor: '#B0B0B0', marginLeft: '2%'}}> </div>
                <CommentsDiv>
                    <div style ={{backgroundColor: 'yellow', height: '900px', width: '100%'}}></div>
                </CommentsDiv>
                <div style ={{height: '2px', width: '95%', backgroundColor: '#B0B0B0', marginLeft: '2%'}}> </div>
                <FormDiv>
                    <form class="comment" action="action_page.php">
                        <input type="text" placeholder="Comment" name="search"></input>
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

const mapDispatchToProps = {
createPost: data => {
    return { payload: data, type: 'CREATE_POST' }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)


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




