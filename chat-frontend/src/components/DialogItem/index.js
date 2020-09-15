import React from 'react';
import classNames from 'classnames';
import format from 'date-fns/format';
import { parseISO } from 'date-fns';
import isToday from 'date-fns/isToday';

import { IconRead, Avatar } from "../index";

const getMessageTime = created_at => {
    if (isToday(parseISO(created_at))) {
        return format(parseISO(created_at), 'HH:mm');
    } else {
        return format(
            parseISO(created_at),
            'dd/MM/yyyy'
        );
    }
};

const DialogItem = ({_id, user, unread, created_at, text, isMe, onSelect}) => {
    return (
        <div
            className={classNames("dialogs__item", {
                'dialogs__item--online': user.isOnline
            })}
            onClick={onSelect.bind(this, _id)}
        >
            <div className="dialogs__item-avatar">
                <Avatar user={user}/>
            </div>
            <div className="dialogs__item-info">
                <div className="dialogs__item-info-top">
                    <b>{user.fullname}</b>
                    <span>
                        {getMessageTime(created_at)}
                    </span>
                </div>
                <div className="dialogs__item-info-bottom">
                    <p>{text}</p>
                    {isMe ?
                        <IconRead isMe={true} isRead={true}/>
                        : (unread > 0) && <div className="dialogs__item-info-bottom-count">{unread > 9 ? '9+' : unread}</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default DialogItem;
