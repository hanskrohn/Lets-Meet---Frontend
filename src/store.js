import { createStore, compose, applyMiddleware } from 'redux'
import history from './history'
import ReduxThunk from 'redux-thunk'


const initialState = {
    currentUser: {},
    post: [], 
    usersPost: [],
    chosenUserPost: [],
    users: [],
    followers: [],
    following: [],
    chosenUser: {},
    chosenUserPost: []
}


const reducer = ( state, action ) => {
    console.log("action", action)
    switch(action.type){
        case 'CREATE_POST':
            state = {
                ...state,
                usersPost: [action.payload, ...state.usersPost],
                post: [action.payload, ...state.post]
            }
        break
        case 'CURRENT_USER':
            state = {
                ...state,
                currentUser: action.payload
            }
        break
        case 'GET_USERS':
            state = {
                ...state,
                users: action.payload
            }
        break
        case 'USERS_POSTS':
            state = {
                ...state,
                usersPost: state.usersPost.concat(action.payload)
            }
        break
        case 'GET_FOLLOWERS':
            state = {
                ...state,
                followers: action.payload
            }
        break
        case 'GET_FOLLOWING':
            state = {
                ...state,
                following: action.payload
            }
        break
        case 'SET_USER':
            state = {
                ...state,
                chosenUser: action.payload
            }
        break
        case 'CHOSEN_USER_POST':
            state = {
                ...state,
                chosenUserPost: action.payload
            }
        break
        case 'GET_POST':
            state = {
                ...state,
                post: action.payload
            }
        break
        case 'UNFOLLOW_USER':
            let following = state.following.filter( (user) => {
                return user!==action.payload
            })
            state = {
                ...state,
                following: following
            }
        break
        case 'USERS_POST':
            state = {
                ...state,
                usersPost: action.payload
            }
        break

    }
    console.log("state", state)
    return state
}

const middleware = compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

if(localStorage.getItem('token')){
    fetch('http://localhost:3000/current_user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
    })
    .then(res => res.json())
    .then(user =>{
        store.dispatch({type: 'CURRENT_USER', payload: user})
    }) 
}

export const store = createStore(
    reducer,
    initialState,
    middleware
)