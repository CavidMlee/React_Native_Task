import { createStore, combineReducers, compose, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';

import signInReducer from './src/reducer/signInReducer'
import newTaskReducer from './src/reducer/creatReducer'
import listReducer from './src/reducer/listReducer'
import deleteReducer from './src/reducer/deleteReducer'
import editReducer from './src/reducer/editReducer'
import loginReducer from './src/reducer/loginReducer'

const rootReducer = combineReducers({
    signInReducer,
    newTaskReducer,
    listReducer,
    deleteReducer,
    editReducer,
    loginReducer,
});

const allEnhancers = compose(
    applyMiddleware(thunk)
)

const store = createStore(
    rootReducer,
    allEnhancers
);

export default store