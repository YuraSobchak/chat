import React, { useState } from 'react';
import { connect } from "react-redux";

import { userApi, dialogsApi } from "../utils/api";
import { Sidebar as SidebarBase } from "../components";

const Sidebar = ({ user }) => {
    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [users, setUsers] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(false);
    const [messageText, setMessageText] = useState(false);

    const onClose = () => {
        setVisible(false);
    };

    const onShow = () => {
        setVisible(true);
    };

    const onSearch = value => {
        setIsSearching(true);
        userApi
            .findUsers(value)
            .then(({ data }) => {
                setUsers(data);
                setIsSearching(false);
            })
            .catch(() => {
                setIsSearching(false);
            });
    };

    const onAddDialog = () => {
        dialogsApi
            .create({
                partner: selectedUserId,
                text: messageText
            })
            .then(onClose)
            .catch(() => {
                setIsSearching(false);
            });
    };

    const handleChangeInput = value => {
        setInputValue(value);
    };

    const onChangeTextArea = e => {
        setMessageText(e.target.value);
    };

    const onSelectUser = userId => {
        setSelectedUserId(userId);
    };

    return (
        <SidebarBase
            visible={visible}
            user={user}
            onClose={onClose}
            onShow={onShow}
            onSearch={onSearch}
            isSearching={isSearching}
            inputValue={inputValue}
            messageText={messageText}
            onChangeInput={handleChangeInput}
            onChangeTextArea={onChangeTextArea}
            onModalOk={onAddDialog}
            users={users}
            selectedUserId={selectedUserId}
            onSelectUser={onSelectUser}
        />
    );
};

export default connect(
    ({ user }) => ({ user: user.data })
)(Sidebar);
