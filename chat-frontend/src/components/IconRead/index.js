import React  from 'react';
import PropTypes from 'prop-types';
import readSvg from "../../assets/img/readed.svg";
import noReadSvg from "../../assets/img/noreaded.svg";

const IconRead = ({ isMe, isRead }) =>
    (isMe &&
        (isRead ? (
            <img className="message__icon-readed" src={readSvg} alt="Readed icon" />
        ) : (
            <img
                className="message__icon-readed message__icon-readed--no"
                src={noReadSvg}
                alt="No readed icon"
            />
        ))) ||
    null;

IconRead.propTypes = {
    isMe: PropTypes.bool,
    isRead: PropTypes.bool,
};

export default IconRead;
