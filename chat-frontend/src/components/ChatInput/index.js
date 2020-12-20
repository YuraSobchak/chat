import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from "antd";
import { SmileOutlined, CameraOutlined, AudioOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { UploadField } from '@navjobs/upload';
import { Picker } from 'emoji-mart';

import './ChatInput.scss';

const ChatInput = props => {
    const [value, setValue] = useState("");
    const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
    const { onSendMessage, currentDialogId } = props;

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!emojiPickerVisible);
    };

    const handleSendMessage = (e) => {
        if (e.keyCode === 13) {
            onSendMessage(value, currentDialogId);
            setValue("");
        }
    };

    return (
        <div className="chat-input">
            <div className="chat-input__smile-btn">
                {emojiPickerVisible && (<div className="chat-input__emoji-picker">
                    <Picker set='google' />
                </div>)}
                <Button
                    onClick={toggleEmojiPicker}
                    type="link"
                    shape="circle"
                    icon={<SmileOutlined/>}/>
            </div>
            <Input
                size="large"
                onChange={e => setValue(e.target.value)}
                onKeyUp={handleSendMessage}
                placeholder="Insert your message"
                value={value}
            />
            <div className="chat-input__actions">
                <UploadField
                    onFiles={files => console.log(files)}
                    containerProps={{
                        className: "chat-input__actions-upload-btn"
                    }}
                    uploadProps={{
                        accept: ".jpg,.jpeg,.png,.gif,.bmp",
                        multiple: "multiple"
                    }}
                >
                    <Button type="link" shape="circle" icon={<CameraOutlined/>}/>
                </UploadField>
                {value ? (
                    <Button type="link" shape="circle" icon={<CheckCircleOutlined/>}/>
                ) : (
                    <Button type="link" shape="circle" icon={<AudioOutlined/>}/>
                )}
            </div>
        </div>
    );
};

ChatInput.propTypes = {
    className: PropTypes.string
};

export default ChatInput;
