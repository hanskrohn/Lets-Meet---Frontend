import React from 'react'
import history from '../../history'
import styled from 'styled-components'


class User extends React.Component  {

    state = {
        follow: false
    }

    componentWillMount(){
            fetch(`http://localhost:3000/isFollowing/${this.props.user.id}`,{
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('token')}` 
                                    }
                                })
                .then(res => res.json())
                .then( data => {

                    this.setState({
                        follow: data
                    })
                })
    }

    handleState(){
        console.log("it worked")
        this.setState({
            follow: !this.state.follow
        })
    }

    follow = () => {
        this.handleState()
        this.props.follow(this.props.user)
    }

    unfollow = () => {
        this.handleState()
        this.props.unfollow(this.props.user)
    }

    render(){
        console.log(this.state.follow)
        return(
                 <div style = {{paddingTop: '3%'}} > 
                    <Div > 
                        <div style = {{cursor: 'pointer', flex: '85'}} onClick = { () => history.push(`/users/${this.props.user.id}`)}> 
                            <DivSpecial>
                                <div style = {{ flex: '10' }}>
                                    <Img src = {this.props.user.profile_img}/>
                                </div>
                                <div style = {{ flex: '90', marginTop: '3%' }}>
                                    <h3 >{this.props.user.username}</h3>
                                </div>
                            </DivSpecial>
                        </div>
                        
                        <div style = {{flex: '15', paddingTop: '10px' }}>
                            {this.state.follow 
                            ? 
                            <UnfollowBtn onClick = {this.unfollow}  style = {{outline: 'none'}} ><strong style = {{fontSize: '15px'}}>Unfollow</strong></UnfollowBtn>
                            :
                            <FollowBtn onClick = {this.follow}  style = {{outline: 'none'}} ><strong style = {{fontSize: '15px'}}>Follow</strong></FollowBtn>
                            }
                        </div>
                    </Div>
                </div>
      
        )
    }
}

export default (User)

const cardHeight = 75

const DivSpecial = styled.div`
    display: flex;
`

const FollowBtn = styled.button`
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    float: right;
    height: 50px;
    margin-right: 3%;
    border-radius: 4px;
    border: 2px solid #ccc;
    color: #0177F9;
    transition: 0.25s all ease-out;
    width: 100%;
    &:hover {
        background-color: #0177F9; /* Green */
        color: white;
    }
`
const UnfollowBtn = styled.button`
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    float: right;
    height: 50px;
    margin-right: 3%;
    border-radius: 4px;
    border: 2px solid #ccc;
    color: #000;
    width: 100%;
`
const Div = styled.div`
    width: 86%;
    margin-left: 7%;
    margin-right: 7%;
    height: ${cardHeight}px;
    border: 2px solid #ccc;
    display: flex;
`

const Img = styled.img`
    padding: 15px;
    height: ${cardHeight}px;

`
