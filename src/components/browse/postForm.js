import React from 'react'
import history from '../../history'
import styled from 'styled-components'

const PostForm = (props) => {
    return(
        <div style ={{paddingLeft: '5%'}}>
            <Div >
                <form onSubmit = { (e) => props.createPost(e) } name = "post">
                    <Title placeholder = "Title" name = "Title" required/>
                    <Address placeholder = "Address" name ="Address" required/>
                    <Number placeholder = "Size Limit" type = "Number" name = "limit" required/>
                    <Date name = "Date" required/>
                    <Time placeholder = "Time" type = "time" name = "Time" required/>
                    <TextArea placeholder = "Description" name = "Description" required/>
                    <Button style = {{outline: 'none'}} ><strong style = {{fontSize: '15px'}}> Create Meeting</strong></Button>
                </form>
            </Div>
        </div>
    )
}

const Div = styled.div`
    border: 2px solid #ccc;
    resize: none;
    height: 530px;
    box-shadow: 0 0 50px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    position: fixed;
    width: 22%;
    top: 16%;
    
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

const TextArea = styled.textarea`
    width: 94%;
    margin-left: 3%;
    height: 150px;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    resize: none;
    margin-bottom: 5px;
   
`
const Title = styled.input`
    margin-top: 3%;
    width: 94%;
    margin-left: 3%;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    resize: none;
    margin-bottom: 5px;
    
`
const Address = styled.input`
    width: 94%;
    margin-left: 3%;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    resize: none;
    margin-bottom: 5px;
`
const Date = styled.input`
    width: 94%;
    margin-left: 3%;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    resize: none;
    margin-bottom: 5px;
`
const Time = styled.input`
    width: 94%;
    margin-left: 3%;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    resize: none;
    margin-bottom: 5px;
`
const Number = styled.input`
    width: 94%;
    margin-left: 3%;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    resize: none;
    margin-bottom: 5px;
`
export {PostForm}
