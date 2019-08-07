import { createStore, compose, applyMiddleware } from 'redux'
import history from './history'
import ReduxThunk from 'redux-thunk'


const initialState = {
    username: '',
    name: '',
    email: '',
    country: '',
    city: '',
    password: '',
    bio: '',
}

const reducer = ( state, action ) => {
    switch(action.type){
        case 'SIGN_UP':
            history.push('/sign-in')
        break        
    }
    return state
}

const middleware = compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export const store = createStore(
    reducer,
    initialState,
    middleware
)