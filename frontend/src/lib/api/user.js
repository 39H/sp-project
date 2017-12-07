import axios from 'axios';

export const getMyInfo = () => axios.get('/api/user');
export const deleteAccount = () => axios.delete('/api/user');
export const getUserInfo = ({userName}) => axios.get('/api/user/'+userName);
export const editProfile = ({profile}) => axios.patch('/api/user', {profile});
export const editPassword = ({currentPassword, newPassword}) => axios.patch('/api/user/password', {currentPassword, newPassword});
//patchUserInfo