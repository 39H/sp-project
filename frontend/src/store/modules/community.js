import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as CommunityAPI from 'lib/api/community';

// action types
const SET_ROWS_PER_PAGE = 'community/SET_ROWS_PER_PAGE';
const SET_PAGE = 'community/SET_PAGE';
const GET_THREADS = 'community/GET_THREADS';

export const setRowsPerPage = createAction(SET_ROWS_PER_PAGE); // ({rowsPerPage})
export const setPage = createAction(SET_PAGE); // ({page})
export const getThreads = createAction(GET_THREADS, CommunityAPI.getThreads); // ({userName})

const initialState = Map({
    threads: null,
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