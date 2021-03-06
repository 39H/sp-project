import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as ListAPI from 'lib/api/list';

// action types
const GET_WORKS_BY_RECENT = 'list/GET_WORKS_BY_RECENT';
const GET_WORKS_BY_LIKES = 'list/GET_WORKS_BY_LIKES';
const GET_WORKS_BY_USER = 'list/GET_WORKS_BY_USER';
const GET_WORKS_BY_SUBSCRIPTIONS = 'list/GET_WORKS_BY_SUBSCRIPTIONS';

export const getWorksByRecent = createAction(GET_WORKS_BY_RECENT, ListAPI.recent);
export const getWorksByLikes = createAction(GET_WORKS_BY_LIKES, ListAPI.likes);
export const getWorksBySubscriptions = createAction(GET_WORKS_BY_SUBSCRIPTIONS, ListAPI.subscriptions);
export const getWorksByUser = createAction(GET_WORKS_BY_USER, ListAPI.user); // ({userName})

const initialState = Map({
    works: null,
});

export default handleActions({
    ...pender({
        type: GET_WORKS_BY_RECENT,
        onSuccess: (state, action) => {
            const { data: works } = action.payload;
            return state.set('works', fromJS(works));
        },
        onFailure: (state, action) => {
            return state.set('works', List());
        }
    }),
    ...pender({
        type: GET_WORKS_BY_LIKES,
        onSuccess: (state, action) => {
            const { data: works } = action.payload;
            return state.set('works', fromJS(works));
        },
        onFailure: (state, action) => {
            return state.set('works', List());
        }
    }),
    ...pender({
        type: GET_WORKS_BY_SUBSCRIPTIONS,
        onSuccess: (state, action) => {
            const { data: works } = action.payload;
            return state.set('works', fromJS(works));
        },
        onFailure: (state, action) => {
            return state.set('works', List());
        }
    }),
    ...pender({
        type: GET_WORKS_BY_USER,
        onSuccess: (state, action) => {
            const { data: works } = action.payload;
            return state.set('works', fromJS(works));
        },
        onFailure: (state, action) => {
            return state.set('works', List());
        }
    })
}, initialState);