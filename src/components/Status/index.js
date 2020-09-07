import React  from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Status.scss';

const Status = ({ online }) => (
    <div className={classNames('status', { 'status--online': online })}>{ online ? 'online' : 'offline' }</div>
);

Status.propTypes = {
    isMe: PropTypes.bool,
    isRead: PropTypes.bool,
};

export default Status;
