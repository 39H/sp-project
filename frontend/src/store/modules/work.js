import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as WorkAPI from 'lib/api/work';
import * as LikeAPI from 'lib/api/like';
import * as AttachmentAPI from 'lib/api/attachment';

// action types
const GET_WORK = 'work/GET_WORK';
const GET_LIKED = 'work/GET_LIKED';
const LIKE = 'work/LIKE';
const DISLIKE = 'work/DISLIKE';
const CHANGE_INPUT = 'work/CHANGE_INPUT';
const UPLOAD_WORK = 'work/UPLOAD_WORK';
const SET_DEFAULT = 'work/SET_DEFAULT';
const UPLOAD_FILE = 'work/UPLOAD_FILE';
const SET_WORKID = 'work/SET_WORKID';
const UPLOAD_THUMBNAIL = 'work/UPLOAD_THUMBNAIL';
const GET_FILES = 'work/GET_FILES';

export const getWork = createAction(GET_WORK, WorkAPI.getWork);
export const getLiked = createAction(GET_LIKED, LikeAPI.getLiked); // ({id})
export const like = createAction(LIKE, LikeAPI.like); // ({id})
export const dislike = createAction(DISLIKE, LikeAPI.dislike); // ({id})
export const changeInput = createAction(CHANGE_INPUT); // ({name, value})
export const uploadWork = createAction(UPLOAD_WORK, WorkAPI.uploadWork); // ({subject, workType, workURL, content, thumbnail})
export const setDefault = createAction(SET_DEFAULT);
export const uploadFile = createAction(UPLOAD_FILE, AttachmentAPI.uploadFile); // ({formData})
export const setWorkId = createAction(SET_WORKID, AttachmentAPI.setWorkId); // ({files, WorkId})
export const uploadThumbnail = createAction(UPLOAD_THUMBNAIL, AttachmentAPI.uploadThumbnail); // ({image})
export const getFiles = createAction(GET_FILES, AttachmentAPI.getFiles); // ({workid})

const initialState = Map({
    work: null,
    liked: false,
    form: Map({
        subject: '',
        workType: 'image',
        workURL: '',
        content: '',
    }),
    files: List(),
    thumbnail: null,
    error: null,
    uploadResult: null,
    isWorkIdSet: false,
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
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['form', name], value);
    },
    ...pender({
        type: UPLOAD_WORK,
        onSuccess: (state, action) => {
            const { data: result } = action.payload;
            return state.set('uploadResult', fromJS(result));
        }
    }),
    [SET_DEFAULT]: (state, action) => {
        return state.set('form', initialState.get('form'))
                    .set('error', null)
                    .set('uploadResult', null)
                    .set('files', initialState.get('files'))
                    .set('thumbnail', null)
                    .set('isWorkIdSet', false);
    },
    ...pender({
        type: UPLOAD_FILE,
        onSuccess: (state, action) => {
            const { id, fileName, filePath} = action.payload.data;
            return state.set('files', state.get('files').push(Map({id, fileName, filePath})));
        }
    }),
    ...pender({
        type: UPLOAD_THUMBNAIL,
        onSuccess: (state, action) => {
            const { url } = action.payload.data;
            return state.set('thumbnail', url);
        }
    }),
    ...pender({
        type: SET_WORKID,
        onSuccess: (state, action) => {
            return state.set('isWorkIdSet', true);
        }
    }),
    ...pender({
        type: GET_FILES,
        onSuccess: (state, action) => {
            const { data: files } = action.payload;
            return state.set('files', fromJS(files));
        }
    }),
}, initialState);