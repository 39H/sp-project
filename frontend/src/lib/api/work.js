import axios from 'axios';

export const getWork = ({id}) => axios.get('/api/work/'+id);
// to do : 작품 등록, 수정, 삭제