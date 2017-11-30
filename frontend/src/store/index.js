import { createStore, applyMiddleware, compose } from 'redux';
import penderMiddleware from 'redux-pender';
import modules from './modules';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(modules, /* preloadedState, */ composeEnhancers(
    applyMiddleware(penderMiddleware())
));

export default store;