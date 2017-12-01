import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as CommunityAPI from 'lib/api/community';

// action types
const GET_COMMENTS = 'comment/GET_COMMENTS';
const WRITE_COMMENT = 'comment/WRITE_COMMENT';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';

export const getComments = createAction(GET_COMMENTS, CommunityAPI.getComments); // ({userName, threadId})
export const writeComment = createAction(WRITE_COMMENT, CommunityAPI.writeComment); // ({userName, threadId, content})
export const deleteComment = createAction(DELETE_COMMENT, CommunityAPI.deleteComment); // ({userName, threadId, commentId})

const initialState = Map({
    comments: null, // List()
});

export default handleActions({
    ...pender({
        type: GET_COMMENTS,
        onSuccess: (state, action) => {
            const { data: comments } = action.payload;
            return state.set('comments', fromJS(comments));
        }
    }),
}, initialState);