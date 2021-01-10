import { axios } from '../../core';

export default {
    getAllByDialogId: id => axios.get('/messages?dialog=' + id),
    removeById: id => axios.delete('/messages/delete/' + id),
    send: (text, dialogId, attachments) =>
        axios.post('/dialog/addMessage', {
            text: text,
            dialog_id: dialogId,
            attachments
        })
};
