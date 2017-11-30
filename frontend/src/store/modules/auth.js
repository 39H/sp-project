import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as AuthAPI from 'lib/api/auth';

// action types
const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';
const REGISTER = 'auth/REGISTER';
const SHOW_LOGIN_MODAL = 'auth/SHOW_LOGIN_MODAL';
const HIDE_LOGIN_MODAL = 'auth/HIDE_LOGIN_MODAL';
const SHOW_REGISTER_MODAL = 'auth/SHOW_REGISTER_MODAL';
const HIDE_REGISTER_MODAL = 'auth/HIDE_REGISTER_MODAL';
const CHANGE_INPUT_LOGIN = 'auth/CHANGE_INPUT_LOGIN';
const CHANGE_INPUT_REGISTER = 'auth/CHANGE_INPUT_REGISTER';
const SET_ERROR = 'auth/SET_ERROR';


// action creator
export const login = createAction(LOGIN, AuthAPI.login); // ({email, password})
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const register = createAction(REGISTER, AuthAPI.register); // ({email, password, displayName, userName})
export const showLoginModal = createAction(SHOW_LOGIN_MODAL);
export const hideLoginModal = createAction(HIDE_LOGIN_MODAL);
export const showRegisterModal = createAction(SHOW_REGISTER_MODAL);
export const hideRegisterModal = createAction(HIDE_REGISTER_MODAL);
export const changeInputLogin = createAction(CHANGE_INPUT_LOGIN); // ({name, value})
export const changeInputRegister = createAction(CHANGE_INPUT_REGISTER); // ({name, value})
export const setError = createAction(SET_ERROR); // ({error})

// initial state
const initialState = Map({
    loginModal: Map({
        open: false,
    }),
    registerModal: Map({
        open: false,
    }),
    loginForm: Map({
        email: '',
        password: '',
    }),
    registerForm: Map({
        email: '',
        displayName: '',
        userName: '',
        password: '',
    }),
    error:null,
    loginResult: null,
});

export default handleActions({
    [SHOW_LOGIN_MODAL] : (state, action) => {
        return state.setIn(['loginModal', 'open'], true)
                    .set('loginForm', initialState.get('loginForm'))
                    .set('error', null)
                    .setIn(['registerModal', 'open'], false);
    },
    [HIDE_LOGIN_MODAL] : (state, action) => {
        return state.setIn(['loginModal', 'open'], false);
    },
    [SHOW_REGISTER_MODAL] : (state, action) => {
        return state.setIn(['registerModal', 'open'], true)
                    .set('registerForm', initialState.get('registerForm'))
                    .set('error', null)
                    .setIn(['loginModal', 'open'], false);
    },
    [HIDE_REGISTER_MODAL] : (state, action) => {
        return state.setIn(['registerModal', 'open'], false);
    },
    [CHANGE_INPUT_LOGIN] : (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['loginForm', name], value);
    },
    [CHANGE_INPUT_REGISTER] : (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['registerForm', name], value);
    },
    [SET_ERROR] : (state, action) => {
        return state.set('error', fromJS(action.payload));
    },
    ...pender({
        type: LOGIN,
        onSuccess: (state, action) => {
            const { data: loginResult } = action.payload;
            return state.set('loginResult', loginResult);
        },
        onFailure: (state, action) => {
            return state.set('error', fromJS({
                login: ['The email or password is incorrect.']
            }));
        }
    }),
    ...pender({
        type: REGISTER,
        onFailure: (state, action) => {
            return state.set('error', fromJS({
                // to do something
            }));
        }
    }),
}, initialState);