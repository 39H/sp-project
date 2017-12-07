import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as UserAPI from 'lib/api/user';
import * as CommunityAPI from 'lib/api/community';

// action types
const CHANGE_INPUT_PASSWORD = 'settings/CHANGE_INPUT_PASSWORD';
const DELETE_ACCOUNT = 'settings/DELETE_ACCOUNT';
const EDIT_PASSWORD = 'settings/EDIT_PASSWORD';
const GET_MY_THREADS = 'settings/GET_MY_THREADS';
const GET_MY_COMMENTS = 'settings/GET_MY_COMMENTS';
const SET_ROWS_PER_PAGE = 'settings/SET_ROWS_PER_PAGE';
const SET_PAGE = 'settings/SET_PAGE';

export const changeInputPassword = createAction(CHANGE_INPUT_PASSWORD); // ({name, value})
export const deleteAccount = createAction(DELETE_ACCOUNT, UserAPI.deleteAccount);
export const editPassword = createAction(EDIT_PASSWORD, UserAPI.editPassword); // ({currentPassword, newPassword})
export const getMyThreads = createAction(GET_MY_THREADS, CommunityAPI.getMyThreads);
export const getMyComments = createAction(GET_MY_COMMENTS, CommunityAPI.getMyComments);
export const setRowsPerPage = createAction(SET_ROWS_PER_PAGE);
export const setPage = createAction(SET_PAGE);

const initialState = Map({
    passwordForm: Map({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    }),
    threads: null,
    comments: null,
    error: null,
    page: 0,
    rowsPerPage: 10,
});

export default handleActions({
    [CHANGE_INPUT_PASSWORD]: (state, action) => {
        const {name, value} = action.payload;
        return state.setIn(['passwordForm', name], value);
    },
    ...pender({
        type: GET_MY_THREADS,
        onSuccess: (state, action) => {
            const {data: threads} = action.payload;
            return state.set('threads', fromJS(threads));
        },
    }),
    ...pender({
        type: GET_MY_COMMENTS,
        onSuccess: (state, action) => {
            const {data: comments} = action.payload;
            return state.set('comments', fromJS(comments));
        },
    }),
    [SET_ROWS_PER_PAGE]: (state, action) => {
        const {rowsPerPage} = action.payload;
        return state.set('rowsPerPage', rowsPerPage);
    },
    [SET_PAGE]: (state, action) => {
        const {page} = action.payload;
        return state.set('page', page);
    },
}, initialState);