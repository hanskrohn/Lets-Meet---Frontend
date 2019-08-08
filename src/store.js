import { createStore, compose, applyMiddleware } from 'redux'
import history from './history'
import ReduxThunk from 'redux-thunk'


const initialState = {

    post: []
}

const reducer = ( state, action ) => {
    switch(action.type){
        case 'CREATE_POST':
            state = {
                ...state,
                post: state.post.concat(action.payload)
            }
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