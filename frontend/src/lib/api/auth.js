import axios from 'axios';

export const register = ({email, password, displayName, userName}) => axios.post('/api/auth/register', {email, password, displayName, userName});
export const login = ({email, password}) => axios.post('/api/auth/login', {email, password});
export const logout = () => axios.post('/api/auth/logout');
export const checkLoginStatus = () => axios.get('/api/auth/check');