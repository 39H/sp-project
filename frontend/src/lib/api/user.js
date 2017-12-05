import axios from 'axios';

export const getMyInfo = () => axios.get('/api/user');
export const getUserInfo = ({userName}) => axios.get('/api/user/'+userName);
export const editProfile = ({profile}) => axios.patch('/api/user', {profile});
//patchUserInfo