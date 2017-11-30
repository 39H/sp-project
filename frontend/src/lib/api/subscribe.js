import axios from 'axios';

export const getSubscriptions = () => axios.get('/api/subscribe');
export const getSubscribed = ({userName}) => axios.get('/api/subscribe/'+userName);
export const subscribe = ({userName}) => axios.post('/api/subscribe/'+userName);
export const unsubscribe = ({userName}) => axios.delete('/api/subscribe/'+userName);