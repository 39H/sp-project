import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as AuthAPI from 'lib/api/auth';
import * as UserAPI from 'lib/api/user';

// action types
const SET_USER = 'user/SET_USER';
const CHECK_LOGIN_STATUS = 'user/CHECK_LOGIN_STATUS';
const GET_MY_INFO = 'user/GET_MY_INFO';
const LOGOUT = 'user/LOGOUT';

export const setUser = createAction(SET_USER); // ({user 객체})
export const checkLoginStatus = createAction(CHECK_LOGIN_STATUS, AuthAPI.checkLoginStatus);
export const getMyInfo = createAction(GET_MY_INFO, UserAPI.getMyInfo);
export const logout = createAction(LOGOUT);

const initialState = Map({
    user: null, // Map({id, userName /*, displayName */})
    info: Map({
        displayName: '',
        photo: '',
        profile: '',
    }),
});

export default handleActions({
    [SET_USER]: (state, action) => {
        const { payload: user } = action;
        return state.set('user', Map(user));
    },
    ...pender({
        type: GET_MY_INFO,
        onSuccess: (state, action) => {
            const { data: info } = action.payload;
            return state.set('info', fromJS(info));
        }
    }),
    ...pender({
        type: CHECK_LOGIN_STATUS,
        onSuccess: (state ,action) => {
            const { user } = action.payload.data;
            return state.set('user', Map(user));
        },
        onFailure: (state, action) => {
            return state.set('user', null);
        }
    }),
    [LOGOUT]: (state, action) => {
        return state.set('user', null)
                    .set('info', initialState.get('info'));
    },
}, initialState);