import React from 'react';
import PropTypes from 'prop-types';
import { Empty, Spin } from "antd";
import classNames from 'classnames';

import { Message } from "../index";

import './Messages.scss';

const Messages = ({ user, blockRef, isLoading, items }) => {
    return (
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
                        />
                    ))
                ) : (
                    <Empty/>
                )
            ) : (
                <Empty/>
            )}
        </div>
    );
};

Messages.propTypes = {
    items: PropTypes.array,
};

export default Messages;
