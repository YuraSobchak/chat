import React from 'react';
import classNames from 'classnames';
import format from 'date-fns/format';
import {parseISO} from 'date-fns';
import isToday from 'date-fns/isToday';
import { Link } from 'react-router-dom';

import {IconRead, Avatar} from "../index";

const getMessageTime = createdAt => {
    if (isToday(parseISO(createdAt))) {
        return format(parseISO(createdAt), 'HH:mm');
    } else {
        return format(
            parseISO(createdAt),
            'dd/MM/yyyy'
        );
    }
};

const DialogItem = ({
    _id,
    unread,
    isMe,
    currentDialogId,
    lastMessage
}) => {
    return (
        <Link to={`/dialog/${_id}`}>
            <div
                className={classNames("dialogs__item", {
                    'dialogs__item--online': lastMessage.user.isOnline,
                    'dialogs__item--selected': currentDialogId === _id
                })}
            >
                <div className="dialogs__item-avatar">
                    <Avatar user={lastMessage.user}/>
                </div>
                <div className="dialogs__item-info">
                    <div className="dialogs__item-info-top">
                        <b>{lastMessage.user.fullname}</b>
                        <span>
                            {getMessageTime(lastMessage.createdAt)}
                        </span>
                    </div>
                    <div className="dialogs__item-info-bottom">
                        <p>{lastMessage.text}</p>
                        {isMe ?
                            <IconRead isMe={true} isRead={true}/>
                            : (unread > 0) &&
                            <div className="dialogs__item-info-bottom-count">{unread > 9 ? '9+' : unread}</div>
                        }
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default DialogItem;
