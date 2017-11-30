import axios from 'axios';

export const getLiked = ({id}) => axios.get('/api/like/'+id);
export const like = ({id}) => axios.post('/api/like/'+id);
export const dislike = ({id}) => axios.delete('/api/like/'+id);