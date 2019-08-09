import { createStore, compose, applyMiddleware } from 'redux'
import history from './history'
import ReduxThunk from 'redux-thunk'


const initialState = {
    currentUser: {},
    post: [
        {
        description: 'description',
        address: 'address',
        limit: 5,
        user_id: 1,
        date: 'date',
        time: 'time',
        title: 'title',
        id: 1
    },
    {
        description: 'description',
        address: 'address',
        limit: 5,
        user_id: 1,
        date: 'date',
        time: 'time',
        title: 'title',
        id: 2
    },
    {
        description: 'description',
        address: 'address',
        limit: 5,
        user_id: 1,
        date: 'date',
        time: 'time',
        title: 'title',
        id: 2
    }  ,
    {
        description: 'description',
        address: 'address',
        limit: 5,
        user_id: 1,
        date: 'date',
        time: 'time',
        title: 'title',
        id: 2
    }  ,
    {
        description: 'description',
        address: 'address',
        limit: 5,
        user_id: 1,
        date: 'date',
        time: 'time',
        title: 'title',
        id: 2
    }  ,
    {
        description: 'description',
        address: 'address',
        limit: 5,
        user_id: 1,
        date: 'date',
        time: 'time',
        title: 'title',
        id: 2
    }  ,
    {
        description: 'description',
        address: 'address',
        limit: 5,
        user_id: 1,
        date: 'date',
        time: 'time',
        title: 'title',
        id: 2
    }  ,
    {
        description: 'description',
        address: 'address',
        limit: 5,
        user_id: 1,
        date: 'date',
        time: 'time',
        title: 'title',
        id: 2
    }  
], 
    users: []
}


const reducer = ( state, action ) => {
    console.log(action)
    switch(action.type){
        case 'CREATE_POST':
            state = {
                ...state,
                post: state.post.concat(action.payload)
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
    }
    console.log(state)
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
    
    fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
    })
    .then(res => res.json())
    .then(user =>{
        store.dispatch({type: 'GET_USERS', payload: user})
    })
    
}

export const store = createStore(
    reducer,
    initialState,
    middleware
)