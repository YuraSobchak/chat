import React  from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Popover, Button } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';

import './Status.scss';

const Status = ({ online, fullname }) => (
    <div className="chat__dialog-header">
        <div className="chat__dialog-header-center">
            <b className="chat__dialog-header-username">{fullname}</b>
            <div className="chat__dialog-header-status">
        <span className={classNames('status', { 'status--online': online })}>
          {online ? 'онлайн' : 'офлайн'}
        </span>
            </div>
        </div>
        <Popover
            className="chat__dialog-header-action"
            content={
                <div>
                    <Button>Удалить диалог</Button>
                </div>
            }
            trigger="click">
            <div>
                <Button type="link" shape="circle" icon={<EllipsisOutlined/>} />
            </div>
        </Popover>
    </div>
);

Status.propTypes = {
    isMe: PropTypes.bool,
    isRead: PropTypes.bool,
};

export default Status;
