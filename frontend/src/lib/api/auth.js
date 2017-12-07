import axios from 'axios';

export const register = ({email, password, displayName, userName}) => axios.post('/api/auth/register', {email, password, displayName, userName});
export const login = ({email, password}) => axios.post('/api/auth/login', {email, password});
export const logout = () => axios.post('/api/auth/logout');
export const checkLoginStatus = () => axios.get('/api/auth/check');
export const forgotPassword = ({email}) => axios.post('/api/auth/password', {email});
export const changeForgotPassword = ({email, code, newPassword}) => axios.patch('/api/auth/password', {email, code, newPassword});