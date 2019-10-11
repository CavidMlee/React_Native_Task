import { createStore, compose, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/reducer/reducers.js';

const allEnhancers = compose(
    applyMiddleware(thunk)
)

const store = createStore(
    reducers,
    allEnhancers
);

export default store