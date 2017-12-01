import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as UserAPI from 'lib/api/user';
import * as SubscribeAPI from 'lib/api/subscribe';

// action types
const GET_USER_INFO = 'portfolio/GET_USER_INFO';
const GET_SUBSCRIBED = 'portfolio/GET_SUBSCRIBED';
const SUBSCRIBE = 'portfolio/SUBSCRIBE';
const UNSUBSCRIBE = 'portfolio/UNSUBSCRIBE';
const SET_MODE = 'portfolio/SET_MODE';

export const getUserInfo = createAction(GET_USER_INFO, UserAPI.getUserInfo); // ({userName})
export const getSubscribed = createAction(GET_SUBSCRIBED, SubscribeAPI.getSubscribed); // ({userName})
export const subscribe = createAction(SUBSCRIBE, SubscribeAPI.subscribe); // ({userName})
export const unsubscribe = createAction(UNSUBSCRIBE, SubscribeAPI.unsubscribe); // ({userName})
export const setMode = createAction(SET_MODE); // ({mode})

const initialState = Map({
    userInfo: Map(),
    subscribed: false,
    mode: 0, // 0: works, 1: community
});

export default handleActions({
    [SET_MODE]: (state, action) => {
        const { payload: mode } = action;
        return state.set('mode', mode);
    },
    ...pender({
        type: GET_USER_INFO,
        onSuccess: (state, action) => {
            const { data: userInfo } = action.payload;
            return state.set('userInfo', fromJS(userInfo));
        }
    }),
    ...pender({
        type: GET_SUBSCRIBED,
        onSuccess: (state, action) => {
            const { subscribed } = action.payload.data;
            return state.set('subscribed', subscribed);
        }
    }),
    ...pender({
        type: SUBSCRIBE,
        onSuccess: (state, action) => {
            return state.set('subscribed', true);
        }
    }),
    ...pender({
        type: UNSUBSCRIBE,
        onSuccess: (state, action) => {
            return state.set('subscribed', false);
        }
    }),
}, initialState);