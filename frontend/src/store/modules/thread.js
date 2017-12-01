import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as CommunityAPI from 'lib/api/community';

// action types
const GET_THREAD = 'thread/GET_THREAD';
const PATCH_THREAD = 'thread/PATCH_THREAD';
const DELETE_THREAD = 'thread/DELETE_THREAD';

export const getThread = createAction(GET_THREAD, CommunityAPI.getThread); // ({userName, threadId})
export const patchThread = createAction(PATCH_THREAD, CommunityAPI.patchThread); // ({userName, threadId, subject, content})
export const deleteThread = createAction(DELETE_THREAD, CommunityAPI.deleteThread); // ({userName, threadId})

const initialState = Map({
    thread: null, // Map() 으로?
});

export default handleActions({
    ...pender({
        type: GET_THREAD,
        onSuccess: (state, action) => {
            const { data: thread } = action.payload;
            return state.set('thread', fromJS(thread));
        }
    }),
}, initialState);