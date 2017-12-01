import axios from 'axios';

export const getThreads = ({userName}) => axios.get('/api/community/'+userName);
export const writeThread = ({userName, subject, content}) => axios.post('/api/community/'+userName, {subject, content});

export const getThread = ({userName, threadId}) => axios.get('/api/community/'+userName+'/'+threadId);
export const patchThread = ({userName, threadId, subject, content}) => axios.patch('/api/community/'+userName+'/'+threadId, {subject, content});
export const deleteThread = ({userName, threadId}) => axios.delete('/api/community/'+userName+'/'+threadId);

export const getComments = ({userName, threadId}) => axios.get('/api/community/'+userName+'/'+threadId+'/comment');
export const writeComment = ({userName, threadId, content}) => axios.post('/api/community/'+userName+'/'+threadId+'/comment', {content});

export const getComment = ({userName, threadId, commentId}) => axios.get('/api/community/'+userName+'/'+threadId+'/comment/'+commentId);
export const patchComment = ({userName, threadId, commentId, content}) => axios.patch('/api/community/'+userName+'/'+threadId+'/comment/'+commentId, {content});
export const deleteComment = ({userName, threadId, commentId}) => axios.delete('/api/community/'+userName+'/'+threadId+'/comment/'+commentId);
