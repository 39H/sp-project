import axios from 'axios';

export const getWork = ({id}) => axios.get('/api/work/'+id);
export const deleteWork = ({id}) => axios.delete('/api/work/'+id);
export const uploadWork = ({subject, workType, workURL, content, thumbnail}) => {
    let params = {};
    switch(workType) {
        case 'video':
            params = {subject, workType, workURL, content};
            break;
        case 'image':
            params = {subject, workType, content, thumbnail};
            break;
        case 'text':
            params = {subject, workType, content};
            break;
    }
    return axios.post('/api/work', params);
};
// to do : 작품 등록, 수정, 삭제