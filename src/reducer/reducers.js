import {combineReducers} from 'redux';

import signUpReducer from './signUpReducer'
import newTaskReducer from './creatReducer'
import listReducer from './listReducer'
import deleteReducer from './deleteReducer'
import editReducer from './editReducer'
import loginReducer from './loginReducer'
import listDelayReducer from './listDelayReducer'
import tabsReducer from './tabsReducer'
import uploadFileReducer from './uploadFileReducer'

export default combineReducers({
    signUpReducer,
    newTaskReducer,
    listReducer,
    deleteReducer,
    editReducer,
    loginReducer,
    listDelayReducer,
    tabsReducer,
    uploadFileReducer
});