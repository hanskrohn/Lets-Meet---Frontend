import React, { useState, useEffect } from 'react'
import './profile.css'
import history from '../../history'
import styled from 'styled-components'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
// import imageDataURI from 'image-data-uri'
import {base64StringtoFile,
    downloadBase64File,
    extractImageFileExtensionFromBase64,
    image64toCanvasRef} from './ReuseableUtils'




const MyVerticallyCenteredModal = (props)=> {
    
    const [imgSrc, setImgSrc] = useState(null)
    const [imgSrcExt, setImgSrcExt] = useState(null)
    const [crop, setCrop] = useState({aspect: 1/1})

    const fileInputRef = React.createRef()
    const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
    const imageMaxSize = 1000000000
    const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})

    
    useEffect(() => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext('2d');

        const base_image = new Image();
        base_image.src = props.user.profile_url;
        console.log(base_image)
        console.log("ok", base_image)
        const jpegUrl = canvas.toDataURL('image/jpeg', base_image.src);
        console.log(jpegUrl)
        setImgSrc(jpegUrl) 
    })
   
    const verifyFile = (files) => {
        if (files && files.length > 0){
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if(currentFileSize > imageMaxSize) {
                alert("This file is not allowed. " + currentFileSize + " bytes is too large")
                return false
            }
            if (!acceptedFileTypesArray.includes(currentFileType)){
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        }
    }

    const  handleFileSelect = event => {
        const files = event.target.files
        if (files && files.length > 0){
              const isVerified = verifyFile(files)
             
             if (isVerified){
                 // imageBase64Data 
                 const currentFile = files[0]
                 const myFileItemReader = new FileReader()
                 myFileItemReader.addEventListener("load", ()=>{
                    //  console.log(myFileItemReader)
                    // console.log(myFileItemReader.result)
                    const myResult = myFileItemReader.result
                    // console.log(myResult)
                    setImgSrc(myResult)
                    setImgSrcExt(extractImageFileExtensionFromBase64(myResult))
                    
                 }, false)
    
                 myFileItemReader.readAsDataURL(currentFile)
    
             }
        }
    }
    console.log(props.user.profile_url)
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
            Edit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <form onSubmit={props.handleSubmit} className="login-form">
            <div style = {{marginBottom: '20px'}}>
                <div style = {{marginRight: '35%', marginLeft:'35%'}}>
                    <img style = {{ width: '100%', height: '100%'}} src = {imgSrc}/>
                </div>
                <input ref={fileInputRef} accept={acceptedFileTypes}  multiple={false} onChange={handleFileSelect} style = {{marginLeft: '40%'}} type = 'file' id='profile_img' name='profile_img'/>   
            </div>
            <div>
                <input style = {{outline: '0', background: 'white', width: '100%', border: '2px solid #ccc', margin: '0 0 15px', boxSizing: 'border-box', fontSize:'14px'}}  name = "username" type="username" placeholder="Username" required/>
            </div>
            <div>
                <input style = {{outline: '0', background: 'white', width: '100%', border: '2px solid #ccc', margin: '0 0 15px', boxSizing: 'border-box', fontSize:'14px'}}  name = "name" type="name" placeholder="Full Name" required/>    
            </div>
            <div>
                <input style = {{outline: '0', background: 'white', width: '100%', border: '2px solid #ccc', margin: '0 0 15px', boxSizing: 'border-box', fontSize:'14px'}}  name = "email" type="email" placeholder="Email" required/>  
            </div>
            <div>
                <input style = {{outline: '0', background: 'white', width: '100%', border: '2px solid #ccc', margin: '0 0 15px', boxSizing: 'border-box', fontSize:'14px'}} name = "country" type="country" placeholder="Country" required />
            </div>
            <div>
                <input style = {{outline: '0', background: 'white', width: '100%', border: '2px solid #ccc', margin: '0 0 15px', boxSizing: 'border-box', fontSize:'14px'}}  name = "city" type="city" placeholder="City" required />  
            </div>
            <div>
                <input style = {{outline: '0', background: 'white', width: '100%', border: '2px solid #ccc', margin: '0 0 15px', boxSizing: 'border-box', fontSize:'14px'}}  name = "password" type="password" placeholder="password"  required/>  
            </div>
            <div>
                <textarea style = {{ height: '150px', border: '2px solid #ccc', width: '100%', resize: 'none', fontSize:'14px'}} name = "bio" type="bio" placeholder="Tell us About Yourself" /> 
            </div>
            <Button onClick={props.onHide} style = {{float: 'right'}} type = "submit">Update</Button>
        </form>
        </Modal.Body> 
      </Modal>
    );
  }


const Profile = (props) => {
    const [modalShow, setModalShow] = useState(false);
    return(
        <div style ={{paddingLeft: '5%'}}> 
            {modalShow
                ?
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    user = {props.user}
                />  
                :
                null
            }
            <Div>
                {history.location.pathname == '/profile'
                    ?
                    <div class = "textWithBlurredBg format"> 
                        <img src = {props.user.profile_url} ></img>
                        <button style={{textAlign: 'center', fontSize: '150%'}} class = "btn" onClick={() => setModalShow(true)}> 
                                EDIT 
                        </button>  
                    </div>
                    :
                    <div style = {{display: 'inline-block', margin: '4px', position: 'relative', height: '40%', marginLeft: '24%', marginRight: '24%'}}>
                        <img style = {{height: '100%', width: '100%', borderRadius: '4px'}} src = {props.user.profile_url} ></img>
                    </div>

                }
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