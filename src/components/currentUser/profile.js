import React, { useState } from 'react'
import './profile.css'
import history from '../../history'
import styled from 'styled-components'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const MyVerticallyCenteredModal = (props)=> {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{opacity:'1'}}
        >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
            {console.log(props.show)}
        </Modal.Footer>
      </Modal>
    );
  }


const Profile = (props) => {
    const [modalShow, setModalShow] = useState(false);
    console.log(modalShow)
    return(
        <div style ={{paddingLeft: '5%'}}> 
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />  
            <Div>
                <div class = "textWithBlurredBg format"> 
                    <img src = {props.user.profile_img} ></img>
                    <button style={{textAlign: 'center', fontSize: '150%'}} class = "btn" onClick={() => setModalShow(true)}> 
                            EDIT 
                    </button>  
                </div>
                <br></br>
                <div>
                    <h1 style = {{fontSize: '400%'}}>{props.user.username}</h1>
                </div>
                <br></br>
                <div>
                    <h4>{props.user.name}</h4>
                </div>
                <br></br>
                <div>
                    <h4>{props.user.email}</h4>
                </div>
                <br></br>
                <div>
                    <h4>{props.user.country}</h4>
                </div>
                <br></br>
                <div>
                    <h4>{props.user.city}</h4>
                </div>
                <br></br>
                <div>
                    <h5>{props.user.bio}</h5>
                </div>
            </Div>
        </div>
    )
}

const Div = styled.div`
    resize: none;
    height: 530px;
    position: fixed;
    width: 22%;
    top: 13%;
    
`
export {Profile}