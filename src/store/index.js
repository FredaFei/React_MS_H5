import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import rootReducers from '@/reducers/';

const initialState = {}
let store = createStore(
    rootReducers,
    initialState,
    applyMiddleware(thunk)
)
export default store