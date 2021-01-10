import React from 'react';
import PropTypes from 'prop-types';
import { Empty, Spin } from "antd";
import classNames from 'classnames';

import { Message } from "../index";

import './Messages.scss';

const Messages = ({ user, blockRef, isLoading, items, onRemoveMessage }) => {
    let blockHeight = 246;

    return (
        <div className="chat__dialog-messages" style={{ height: `calc(100% - ${blockHeight}px)` }}>
            <div
                ref={blockRef}
                className={classNames("messages", {'messages--loading': isLoading})}
            >
                {isLoading ? (
                    <Spin size="large" tip="Loading..."/>
                ) : items && !isLoading ? (
                    items.length > 0 ? (
                        items.map(item => (
                            <Message
                                key={item._id}
                                {...item}
                                isMe={ user._id === item.user._id }
                                onRemoveMessage={onRemoveMessage.bind(this, item._id)}
                                isRead={item.read}
                            />
                        ))
                    ) : (
                        <Empty/>
                    )
                ) : (
                    <Empty/>
                )}
            </div>
        </div>
    );
};

Messages.propTypes = {
    items: PropTypes.array,
};

export default Messages;
