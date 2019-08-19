import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import history from '../../history.js'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card'
import IndividualComment from './individualComment.js'

const Comments = (props) =>  {

    return(
        <div>
            <CardDiv>
                <Card style = {{cursor: 'pointer'}} onClick = {() => history.push(`/comments/post/${props.comment.post.id}`)}>
                    <Card.Header style ={{fontSize: '15px'}}>
                        <div >
                            {props.comment.post.title}
                        </div>
                    </Card.Header>
                    <Card.Body>
                        {props.comment.comments.map((comment) => <IndividualComment comment = {comment}/>)}
                    </Card.Body>
                </Card>
            </CardDiv>
        </div>
    )
}

export default Comments

const CardDiv = styled.div`
    margin: 15px;
    border: 2px solid #ccc;    
`