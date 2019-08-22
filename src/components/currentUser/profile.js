import React, { useState, useEffect } from 'react'
import './profile.css'
import { connect } from 'react-redux'
import history from '../../history'
import styled from 'styled-components'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
// import imageDataURI from 'image-data-uri'
import {
    base64StringtoFile,
    downloadBase64File,
    extractImageFileExtensionFromBase64,
    image64toCanvasRef
} from './ReuseableUtils'




const MyVerticallyCenteredModal = (props) => {

    const [username, setUsername] = useState(props.user.username)
    const [name, setName] = useState(props.user.name)
    const [email, setEmail] = useState(props.user.email)
    const [country, setCountry] = useState(props.user.country)
    const [city, setCity] = useState(props.user.city)
    const [password, setPassword] = useState(null)
    const [bio, setBio] = useState(props.user.bio)

    const [imgSrc, setImgSrc] = useState(props.user.profile_url)
    const [imgSrcExt, setImgSrcExt] = useState(null)
    const [crop, setCrop] = useState({ aspect: 1 / 1 })

    const fileInputRef = React.createRef()
    const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg'
    const imageMaxSize = 1000000000
    const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => { return item.trim() })

    const verifyFile = (files) => {
        if (files && files.length > 0) {
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if (currentFileSize > imageMaxSize) {
                alert("This file is not allowed. " + currentFileSize + " bytes is too large")
                return false
            }
            if (!acceptedFileTypesArray.includes(currentFileType)) {
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        }
    }

    const handleFileSelect = event => {
        const files = event.target.files
        if (files && files.length > 0) {
            const isVerified = verifyFile(files)

            if (isVerified) {
                // imageBase64Data 
                const currentFile = files[0]
                const myFileItemReader = new FileReader()
                myFileItemReader.addEventListener("load", () => {
                    const myResult = myFileItemReader.result
                    setImgSrc(myResult)
                    setImgSrcExt(extractImageFileExtensionFromBase64(myResult))

                }, false)

                myFileItemReader.readAsDataURL(currentFile)

            }
        }
    }

    const handleUsernameChange = (e) =>{
        setUsername(e.target.value)
    }

    const handleNameChange = (e) =>{
        setName(e.target.value)
    }

    const handleEmailChange = (e) =>{
        setEmail(e.target.value)
    }

    const handleCountryChange = (e) =>{
        setCountry(e.target.value)
    }

    const handleCityChange = (e) =>{
        setCity(e.target.value)
    }

    const handlePasswordChange = (e) =>{
        setPassword(e.target.value)
    }

    const handleBioChange = (e) =>{
        setBio(e.target.value)
    }

    console.log(props.user.profile_url)
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ opacity: '1' }}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                <form onSubmit={(e) => updateProfile(e, props) }className="login-form">
                    <div style={{ marginBottom: '20px'}}>
                        <div style={{ marginRight: '38%', marginLeft: '38%' }}>
                            <img style={{ width: '22vh', height: '22vh' }} src={imgSrc} />
                        </div>
                        <input ref={fileInputRef} accept={acceptedFileTypes} multiple={false} onChange={handleFileSelect} style={{ marginLeft: '40%' }} type='file' id='profile_img' name='profile_img' />
                    </div>
                    <div>
                        <input value = {username} onChange={handleUsernameChange}  style={{ outline: '0', background: 'white', width: '100%', border: '2px solid #ccc', margin: '0 0 15px', boxSizing: 'border-box', fontSize: '14px' }} name="username" type="username" placeholder="Username" required />
                    </div>
                    <div>
                        <input value = {name} onChange={handleNameChange} style={{ outline: '0', background: 'white', width: '100%', border: '2px solid #ccc', margin: '0 0 15px', boxSizing: 'border-box', fontSize: '14px' }} name="name" type="name" placeholder="Full Name" required />
                    </div>
                    <div>
                        <input value = {email} onChange={handleEmailChange} style={{ outline: '0', background: 'white', width: '100%', border: '2px solid #ccc', margin: '0 0 15px', boxSizing: 'border-box', fontSize: '14px' }} name="email" type="email" placeholder="Email" required />
                    </div>
                    <div>
                        <input value = {country} onChange={handleCountryChange} style={{ outline: '0', background: 'white', width: '100%', border: '2px solid #ccc', margin: '0 0 15px', boxSizing: 'border-box', fontSize: '14px' }} name="country" type="country" placeholder="Country" required />
                    </div>
                    <div>
                        <input value = {city} onChange={handleCityChange} style={{ outline: '0', background: 'white', width: '100%', border: '2px solid #ccc', margin: '0 0 15px', boxSizing: 'border-box', fontSize: '14px' }} name="city" type="city" placeholder="City" required />
                    </div>
                    <div>
                        <input onChange={handlePasswordChange} style={{ outline: '0', background: 'white', width: '100%', border: '2px solid #ccc', margin: '0 0 15px', boxSizing: 'border-box', fontSize: '14px' }} name="password" type="password" placeholder="password" required />
                    </div>
                    <div>
                        <textarea value = { bio } onChange = {handleBioChange} style={{ height: '150px', border: '2px solid #ccc', width: '100%', resize: 'none', fontSize: '14px' }} name="bio" type="bio" placeholder="Tell us About Yourself" />
                    </div>
                    <Button  style={{ float: 'right' }} type="submit">Update</Button>
                </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}
// props.onHide

const updateProfile = (e, props) => {
    e.preventDefault()
    console.log(props)
    fetch('http://localhost:3000/update',{
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: new FormData(e.target)
      })
      .then(res => res.json())
      .then(user => {
        console.log(user)
        if(user.statusText === "Internal Server Error"){
          alert('Username or Email already taken. Please select another.')
        }
        else{
          props.setCurrentUser(user)
          props.onHide()
        }
      })
}

const Profile = (props) => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <div style={{ paddingLeft: '5%' }}>
            {modalShow
                ?
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    user={props.user}
                    setCurrentUser = {props.setCurrentUser}
                />
                :
                null
            }
            <Div>
                {history.location.pathname == '/profile'
                    ?
                    <div class="textWithBlurredBg format">
                        <img src={props.user.profile_url} ></img>
                        <button style={{ textAlign: 'center', fontSize: '150%' }} class="btn" onClick={() => setModalShow(true)}>
                            EDIT
                        </button>
                    </div>
                    :
                    <div style={{ display: 'inline-block', margin: '4px', position: 'relative', height: '40%', marginLeft: '24%', marginRight: '24%' }}>
                        <img style={{ height: '100%', width: '100%', borderRadius: '4px' }} src={props.user.profile_url} ></img>
                    </div>

                }
                <br></br>
                <div>
                    <h1 style={{ fontSize: '400%' }}>{props.user.username}</h1>
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
                <div className = "bio">
                    <h5>{props.user.bio}</h5>
                </div>
            </Div>
        </div>
    )
}

const mapDispatchToProps = {
    setCurrentUser: data => {
        return { payload: data, type: 'CURRENT_USER'}
      }
}

export default connect(null, mapDispatchToProps)(Profile)


const Div = styled.div`
    resize: none;
    height: 530px;
    position: fixed;
    width: 22%;
    top: 13%;
    
`