import React from 'react';
import orderBy from 'lodash/orderBy';
import { Input, Empty } from "antd";

import { DialogItem } from "../index";

import './Dialogs.scss';

const Dialogs = ({ items, userId, onSearch, inputValue }) => {
    return (
        <div className="dialogs">
            <div className="dialogs__search">
                <Input.Search
                    placeholder="input search text"
                    onChange={e => onSearch(e.target.value)}
                    value={inputValue}
                />
            </div>
            {items.length ? (
                orderBy(items, ['created_at'], ['desc']).map(item => (
                    <DialogItem key={item._id} isMe={item.user._id === userId} {...item}/>
                ))
            ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
            )}
        </div>
    );
};

export default Dialogs;
