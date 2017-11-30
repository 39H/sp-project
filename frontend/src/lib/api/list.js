import axios from 'axios';

export const recent = () => axios.get('/api/list/recent');
export const likes = () => axios.get('/api/list/likes');
export const user = ({userName}) => axios.get('/api/list/user/'+userName);