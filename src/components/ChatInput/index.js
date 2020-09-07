import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from "antd";
import { SmileOutlined, CameraOutlined, AudioOutlined, CheckCircleOutlined } from "@ant-design/icons";

import './ChatInput.scss';

const ChatInput = props => {
    const [value, setValue] = useState("");

    return (
        <div className="chat-input">
            <div className="chat-input__smile-btn">
                <Button type="link" shape="circle" icon={<SmileOutlined/>}/>
            </div>
            <Input
                size="large"
                onChange={e => setValue(e.target.value)}
                placeholder="Insert your message"
            />
            <div className="chat-input__actions">
                <Button type="link" shape="circle" icon={<CameraOutlined/>}/>
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
