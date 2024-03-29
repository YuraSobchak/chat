import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { filesApi } from '../utils/api';
import socket from '../core/socket';

import { ChatInput as ChatInputBase } from '../components';

import { messagesActions, attachmentsActions } from '../redux/actions';

const ChatInput = props => {
    const {
        dialogs: { currentDialogId },
        attachments,
        fetchSendMessage,
        setAttachments,
        removeAttachment,
        user,
    } = props;

    const [value, setValue] = useState('');
    const [emojiPickerVisible, setShowEmojiPicker] = useState(false);

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!emojiPickerVisible);
    };

    const handleOutsideClick = (el, e) => {
        if (el && !el.contains(e.target)) {
            setShowEmojiPicker(false);
        }
    };

    const addEmoji = ({ colons }) => {
        setValue((value + ' ' + colons).trim());
    };

    const sendMessage = () => {
        if (value || attachments.length) {
            fetchSendMessage(value, currentDialogId, attachments.map(file => file.uid));
            setValue('');
            setAttachments([]);
        }
    };

    const handleSendMessage = e => {
        socket.emit('DIALOGS:TYPING', { dialogId: currentDialogId, user });
        if (e.keyCode === 13) {
            sendMessage();
        }
    };

    const onSelectFiles = async files => {
        let uploaded = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const uid = Math.round(Math.random() * 1000);
            uploaded = [
                ...uploaded,
                {
                    uid,
                    name: file.name,
                    status: 'uploading',
                },
            ];
            setAttachments(uploaded);
            // eslint-disable-next-line no-loop-func
            await filesApi.upload(file).then(({ data }) => {
                uploaded = uploaded.map(item => {
                    if (item.uid === uid) {
                        return {
                            status: 'done',
                            uid: data.file._id,
                            name: data.file.filename,
                            url: data.file.url,
                        };
                    }
                    return item;
                });
            });
        }
        setAttachments(uploaded);
    };

    useEffect(() => {
        const el = document.querySelector('.chat-input__smile-btn');
        document.addEventListener('click', handleOutsideClick.bind(this, el));
        return () => {
            document.removeEventListener('click', handleOutsideClick.bind(this, el));
        };
    }, []);

    if (!currentDialogId) {
        return null;
    }

    return (
        <ChatInputBase
            value={value}
            setValue={setValue}
            emojiPickerVisible={emojiPickerVisible}
            toggleEmojiPicker={toggleEmojiPicker}
            addEmoji={addEmoji}
            handleSendMessage={handleSendMessage}
            sendMessage={sendMessage}
            onSelectFiles={onSelectFiles}
            attachments={attachments}
            removeAttachment={removeAttachment}
        />
    );
};

export default connect(
    ({ dialogs, attachments, user }) => ({
        dialogs,
        attachments: attachments.items,
        user: user.data,
    }),
    { ...messagesActions, ...attachmentsActions },
)(ChatInput);
