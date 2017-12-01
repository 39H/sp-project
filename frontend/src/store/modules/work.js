import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as WorkAPI from 'lib/api/work';
import * as LikeAPI from 'lib/api/like';

// action types
const GET_WORK = 'work/GET_WORK';
const GET_LIKED = 'work/GET_LIKED';
const LIKE = 'work/LIKE';
const DISLIKE = 'work/DISLIKE';

export const getWork = createAction(GET_WORK, WorkAPI.getWork);
export const getLiked = createAction(GET_LIKED, LikeAPI.getLiked); // ({id})
export const like = createAction(LIKE, LikeAPI.like); // ({id})
export const dislike = createAction(DISLIKE, LikeAPI.dislike); // ({id})

const initialState = Map({
    work: null,
    liked: false,
});

export default handleActions({
    ...pender({
        type: GET_WORK,
        onSuccess: (state, action) => {
            const { data: work } = action.payload;
            return state.set('work', fromJS(work));
        }
    }),
    ...pender({
        type: GET_LIKED,
        onSuccess: (state, action) => {
            const { liked } = action.payload.data;
            return state.set('liked', liked);
        }
    }),
    ...pender({
        type: LIKE,
        onSuccess: (state, action) => {
            const { likes } = action.payload.data;
            return state.set('liked', true)
                        .setIn(['work', 'likes'], likes);
        }
    }),
    ...pender({
        type: DISLIKE,
        onSuccess: (state, action) => {
            const { likes } = action.payload.data;
            return state.set('liked', false)
                        .setIn(['work', 'likes'], likes);
        }
    }),
}, initialState);