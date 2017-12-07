import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as AuthAPI from 'lib/api/auth';
import * as UserAPI from 'lib/api/user';
import * as AttachmentAPI from 'lib/api/attachment';
import * as SubscribeAPI from 'lib/api/subscribe';

// action types
const SET_USER = 'user/SET_USER';
const CHECK_LOGIN_STATUS = 'user/CHECK_LOGIN_STATUS';
const GET_MY_INFO = 'user/GET_MY_INFO';
const GET_SUBSCRIPTIONS = 'user/GET_SUBSCRIPTIONS';
const LOGOUT = 'user/LOGOUT';
const CHANGE_INPUT = 'user/CHANGE_INPUT';
const UPLOAD_PHOTO = 'user/UPLOAD_PHOTO';
const EDIT_PROFILE = 'user/EDIT_PROFILE';
const SET_DEFAULT = 'user/SET_DEFAULT';

export const setUser = createAction(SET_USER); // ({user 객체})
export const checkLoginStatus = createAction(CHECK_LOGIN_STATUS, AuthAPI.checkLoginStatus);
export const getMyInfo = createAction(GET_MY_INFO, UserAPI.getMyInfo);
export const getSubscriptions = createAction(GET_SUBSCRIPTIONS, SubscribeAPI.getSubscriptions);
export const logout = createAction(LOGOUT);
export const changeInput = createAction(CHANGE_INPUT); // ({name, value})
export const editProfile = createAction(EDIT_PROFILE, UserAPI.editProfile); // ({profile})
export const setDefault = createAction(SET_DEFAULT);
export const uploadPhoto = createAction(UPLOAD_PHOTO, AttachmentAPI.uploadPhoto); // ({image})

const initialState = Map({
    user: null, // Map({id, userName /*, displayName */})
    info: Map({
        displayName: '',
        photo: '',
        profile: '',
    }),
    form: Map({
        profile: '',
    }),
    subscriptions: List(),
    editResult: false,
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
            return state.set('info', fromJS(info))
                        .setIn(['form', 'profile'], info.profile);
        }
    }),
    ...pender({
        type: CHECK_LOGIN_STATUS,
        onSuccess: (state, action) => {
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
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['form', name], value);
    },
    ...pender({
        type: EDIT_PROFILE,
        onSuccess: (state, action) => {
            const { profile } = action.payload.data;
            return state.set('editResult', true)
                        .setIn(['info', 'profile'], profile);
        }
    }),
    [SET_DEFAULT]: (state, action) => {
        return state.set('form', initialState.get('form'))
                    .setIn(['form', 'profile'], state.getIn(['info', 'profile']))
                    .set('editResult', false);
    },
    ...pender({
        type: UPLOAD_PHOTO,
        onSuccess: (state, action) => {
            const { url } = action.payload.data;
            return state.setIn(['info', 'photo'], url);
        }
    }),
    ...pender({
        type: GET_SUBSCRIPTIONS,
        onSuccess: (state, action) => {
            const { data: subscriptions } = action.payload;
            return state.set('subscriptions', fromJS(subscriptions));
        }
    }),
}, initialState);