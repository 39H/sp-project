import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as CommunityAPI from 'lib/api/community';

// action types
const GET_THREAD = 'thread/GET_THREAD';
const WRITE_THREAD = 'thread/WRITE_THREAD';
const PATCH_THREAD = 'thread/PATCH_THREAD';
const DELETE_THREAD = 'thread/DELETE_THREAD';
const CHANGE_INPUT = 'thread/CHANGE_INPUT';
const SET_DEFAULT = 'thread/SET_DEFAULT';
const SET_EDITABLE = 'thread/SET_EDITABLE';

export const getThread = createAction(GET_THREAD, CommunityAPI.getThread); // ({userName, threadId})
export const writeThread = createAction(WRITE_THREAD, CommunityAPI.writeThread); // ({userName, subject, content})
export const patchThread = createAction(PATCH_THREAD, CommunityAPI.patchThread); // ({userName, threadId, subject, content})
export const deleteThread = createAction(DELETE_THREAD, CommunityAPI.deleteThread); // ({userName, threadId})
export const changeInput = createAction(CHANGE_INPUT); // ({name, value})
export const setDefault = createAction(SET_DEFAULT);
export const setEditable = createAction(SET_EDITABLE, CommunityAPI.getThread);

const initialState = Map({
    thread: null, // Map() 으로?
    form: Map({
        subject: '',
        content: '',
    }),
    writeResult: null
});

export default handleActions({
    ...pender({
        type: GET_THREAD,
        onSuccess: (state, action) => {
            const { data: thread } = action.payload;
            return state.set('thread', fromJS(thread));
        }
    }),
    ...pender({
        type: WRITE_THREAD,
        onSuccess: (state, action) => {
            const { data: result } = action.payload;
            return state.set('form', initialState.get('form'))
                        .set('writeResult', fromJS(result));
        }
    }),
    ...pender({
        type: PATCH_THREAD,
        onSuccess: (state, action) => {
            const { data: result } = action.payload;
            return state.set('form', initialState.get('form'))
                        .set('writeResult', fromJS(result));
        }
    }),
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['form', name], value);
    },
    [SET_DEFAULT]: (state, action) => {
        return state.set('form', initialState.get('form'))
                    .set('writeResult', null);
    },
    ...pender({
        type: SET_EDITABLE,
        onSuccess: (state, action) => {
            const { data: thread } = action.payload;
            return state.set('thread', fromJS(thread))
                        .setIn(['form', 'subject'], thread.subject)
                        .setIn(['form', 'content'], thread.content);
        }
    }),
}, initialState);