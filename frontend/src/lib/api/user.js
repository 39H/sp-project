import axios from 'axios';

export const getMyInfo = () => axios.get('/api/user');
export const getUserInfo = ({userName}) => axios.get('/api/user/'+userName);
//patchUserInfo