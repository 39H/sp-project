import { createAction, handleActions, handleAction } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as CommunityAPI from 'lib/api/community';

// action types
const SET_ROWS_PER_PAGE = 'community/SET_ROWS_PER_PAGE';
const SET_PAGE = 'community/SET_PAGE';
const GET_THREADS = 'community/GET_THREADS';
/*const WRITE_THREAD = 'community/WRITE_THREAD';


const GET_THREAD = 'community/GET_THREAD';
const PATCH_THREAD = 'community/PATCH_THREAD';
const DELETE_THREAD = 'community/DELETE_THREAD';

const GET_COMMENTS = 'community/GET_COMMENTS';
const WRITE_COMMENT = 'community/WRITE_COMMENT';

const GET_COMMENT = 'community/GET_COMMENT';
const PATCH_COMMENT = 'community/PATCH_COMMENT';
const DELETE_COMMENT = 'community/DELETE_COMMENT';
*/

export const setRowsPerPage = createAction(SET_ROWS_PER_PAGE); // ({rowsPerPage})
export const setPage = createAction(SET_PAGE); // ({page})
export const getThreads = createAction(GET_THREADS, CommunityAPI.getThreads); // ({userName})
/*export const writeThread = createAction(WRITE_THREAD, CommunityAPI.writeThread); // ({userName, subject, content})


export const getThread = createAction(GET_THREAD, CommunityAPI.getThread); // ({userName, threadId})
export const patchThread = createAction(PATCH_THREAD, CommunityAPI.patchThread); // ({userName, threadId, subject, content})
export const deleteThread = createAction(DELETE_THREAD, CommunityAPI.deleteThread); // ({userName, threadId})

export const getComments = createAction(GET_COMMENTS, CommunityAPI.getComments); // ({userName, threadId})
export const writeComment = createAction(WRITE_COMMENT, CommunityAPI.writeComment); // ({userName, threadId, content})

export const getComment = createAction(GET_COMMENT, CommunityAPI.getComment); // ({userName, threadId, commentId})
export const patchComment = createAction(PATCH_COMMENT, CommunityAPI.patchComment); // ({userName, threadId, commentId, content})
export const deleteComment = createAction(DELETE_COMMENT, CommunityAPI.deleteComment); // ({userName, threadId, commentId})
*/

const initialState = Map({
    threads: List(),
    page: 0,
    rowsPerPage: 10,
});

export default handleActions({
    [SET_ROWS_PER_PAGE]: (state, action) => {
        const { rowsPerPage } = action.payload;
        return state.set('rowsPerPage', rowsPerPage);
    },
    [SET_PAGE]: (state, action) => {
        const { page } = action.payload;
        return state.set('page', page);
    },
    ...pender({
        type: GET_THREADS,
        onSuccess: (state, action) => {
            const {data: threads} = action.payload;
            return state.set('threads', fromJS(threads));
        },
    }),
}, initialState);