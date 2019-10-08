import { createStore, combineReducers, compose, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';

import signUpReducer from './src/reducer/signUpReducer'
import newTaskReducer from './src/reducer/creatReducer'
import listReducer from './src/reducer/listReducer'
import deleteReducer from './src/reducer/deleteReducer'
import editReducer from './src/reducer/editReducer'
import loginReducer from './src/reducer/loginReducer'
import listDelayReducer from './src/reducer/listDelayReducer'
import tabsReducer from './src/reducer/tabsReducer'

const rootReducer = combineReducers({
    signUpReducer,
    newTaskReducer,
    listReducer,
    deleteReducer,
    editReducer,
    loginReducer,
    listDelayReducer,
    tabsReducer
});

const allEnhancers = compose(
    applyMiddleware(thunk)
)

const store = createStore(
    rootReducer,
    allEnhancers
);

export default store