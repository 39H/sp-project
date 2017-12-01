import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as CommunityAPI from 'lib/api/community';

// action types
const GET_COMMENTS = 'comment/GET_COMMENTS';
const WRITE_COMMENT = 'comment/WRITE_COMMENT';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';
const CHANGE_INPUT = 'comment/CHANGE_INPUT';

export const getComments = createAction(GET_COMMENTS, CommunityAPI.getComments); // ({userName, threadId})
export const writeComment = createAction(WRITE_COMMENT, CommunityAPI.writeComment); // ({userName, threadId, content})
export const deleteComment = createAction(DELETE_COMMENT, CommunityAPI.deleteComment); // ({userName, threadId, commentId})
export const changeInput = createAction(CHANGE_INPUT); // ({name, value})

const initialState = Map({
    comments: null, // List()
    form: Map({
        content: '',
    }),
});

export default handleActions({
    ...pender({
        type: GET_COMMENTS,
        onSuccess: (state, action) => {
            const { data: comments } = action.payload;
            return state.set('form', initialState.get('form'))
                        .set('comments', fromJS(comments));
        }
    }),
    ...pender({
        type: WRITE_COMMENT,
        onSuccess: (state, action) => {
            const { data: result } = action.payload;
            return state.set('form', initialState.get('form'));
        }
    }),
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['form', name], value);
    },
}, initialState);