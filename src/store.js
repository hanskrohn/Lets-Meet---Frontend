import { createStore } from 'redux'

const initialState = {
    count: 0
}

const reducer = ( state, action ) => {
    switch(action.type){
        case 'INCREMENT_COUNT':
            return {count: state.count + 1}          
    }
    return state
}

export const store = createStore(
    reducer, 
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)