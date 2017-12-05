import axios from 'axios';

export const uploadFile = ({formData}) => axios.post('/api/attachment', formData, {headers: {'content-type':'multipart/form-data'}});
export const setWorkId = ({files, WorkId}) => axios.patch('/api/attachment', {files, WorkId});
export const uploadThumbnail = ({image}) => axios.post('/api/attachment/thumbnail', {image});
export const uploadPhoto = ({image}) => axios.post('/api/attachment/photo', {image});
export const getFiles = ({workid}) => axios.get('/api/attachment/'+workid);