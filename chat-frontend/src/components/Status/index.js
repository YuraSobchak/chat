import React  from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Status.scss';

const Status = ({ online, fullname }) => (
    <div className="chat__dialog-header-center">
        <b className="chat__dialog-header-username">{fullname}</b>
        <div className="chat__dialog-header-status">
            <span className={classNames('status', { 'status--online': online })}>{ online ? 'online' : 'offline' }</span>
        </div>
    </div>

);

Status.propTypes = {
    isMe: PropTypes.bool,
    isRead: PropTypes.bool,
};

export default Status;
