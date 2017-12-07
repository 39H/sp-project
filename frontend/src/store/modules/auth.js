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
const SHOW_PASSWORD_MODAL = 'auth/SHOW_PASSWORD_MODAL';
const HIDE_PASSWORD_MODAL = 'auth/HIDE_PASSWORD_MODAL';
const CHANGE_INPUT_LOGIN = 'auth/CHANGE_INPUT_LOGIN';
const CHANGE_INPUT_REGISTER = 'auth/CHANGE_INPUT_REGISTER';
const CHANGE_INPUT_PASSWORD = 'auth/CHANGE_INPUT_PASSWORD';
const CHANGE_INPUT_CHANGE_PASSWORD = 'auth/CHANGE_INPUT_CHANGE_PASSWORD';
const SET_ERROR = 'auth/SET_ERROR';
const FORGOT_PASSWORD = 'auth/FORGOT_PASSWORD';
const CHANGE_FORGOT_PASSWORD = 'auth/CHANGE_FORGOT_PASSWORD';
const SET_PASSWORD_DEFAULT = 'auth/SET_PASSWORD_DEFAULT';


// action creator
export const login = createAction(LOGIN, AuthAPI.login); // ({email, password})
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const register = createAction(REGISTER, AuthAPI.register); // ({email, password, displayName, userName})
export const showLoginModal = createAction(SHOW_LOGIN_MODAL);
export const hideLoginModal = createAction(HIDE_LOGIN_MODAL);
export const showRegisterModal = createAction(SHOW_REGISTER_MODAL);
export const hideRegisterModal = createAction(HIDE_REGISTER_MODAL);
export const showPasswordModal = createAction(SHOW_PASSWORD_MODAL);
export const hidePasswordModal = createAction(HIDE_PASSWORD_MODAL);
export const changeInputLogin = createAction(CHANGE_INPUT_LOGIN); // ({name, value})
export const changeInputRegister = createAction(CHANGE_INPUT_REGISTER); // ({name, value})
export const changeInputPassword = createAction(CHANGE_INPUT_PASSWORD);
export const changeInputChangePassword = createAction(CHANGE_INPUT_CHANGE_PASSWORD);
export const setError = createAction(SET_ERROR); // ({error})
export const forgotPassword = createAction(FORGOT_PASSWORD, AuthAPI.forgotPassword); // ({email})
export const setPasswordDefault = createAction(SET_PASSWORD_DEFAULT);
export const changeForgotPassword = createAction(CHANGE_FORGOT_PASSWORD, AuthAPI.changeForgotPassword); // ({email, code, newPassword})

// initial state
const initialState = Map({
    loginModal: Map({
        open: false,
    }),
    registerModal: Map({
        open: false,
    }),
    passwordModal: Map({
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
    passwordForm: Map({
        email: '',
    }),
    changePasswordForm: Map({
        email: '',
        newPassword: '',
        confirmPassword: '',
    }),
    error:null,
    loginResult: null,
    passwordResult: null,
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
    [SHOW_PASSWORD_MODAL] : (state, action) => {
        return state.setIn(['passwordModal', 'open'], true)
                    .set('passwordForm', initialState.get('passwordForm'))
                    .set('error', null)
                    .setIn(['loginModal', 'open'], false);
    },
    [HIDE_PASSWORD_MODAL] : (state, action) => {
        return state.setIn(['passwordModal', 'open'], false);
    },
    [CHANGE_INPUT_LOGIN] : (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['loginForm', name], value);
    },
    [CHANGE_INPUT_REGISTER] : (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['registerForm', name], value);
    },
    [CHANGE_INPUT_PASSWORD] : (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['passwordForm', name], value);
    },
    [CHANGE_INPUT_CHANGE_PASSWORD]: (state, action) => {
        const { name , value } = action.payload;
        return state.setIn(['changePasswordForm', name], value);
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
    [SET_PASSWORD_DEFAULT]: (state, action) => {
        return state.set('passwordResult', null)
                    .set('changePasswordForm', initialState.get('changePasswordForm'));
    },
    ...pender({
        type: CHANGE_FORGOT_PASSWORD,
        onSuccess: (state, action) => {
            return state.set('passwordResult', true);
        },
        onFailure: (state, action) => {
            return state.set('passwordResult', false);
        }
    }),
}, initialState);