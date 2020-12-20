import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { dialogsActions } from "../redux/actions";
import { Dialogs as BaseDialogs } from "../components";
import socket from "../core/socket";

const Dialogs = ({ fetchDialogs, currentDialogId, setCurrentDialogId, items, userId }) => {
    const [inputValue, setValue] = useState("");
    const [filtered, setFilteredItems] = useState(Array.from(items));

    const onChangeInput = (value = '') => {
        setFilteredItems(
            items.filter(
                (dialog => dialog.author.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0) ||
                (dialog => dialog.partner.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0)
            )
        );
        setValue(value);
    };

    const onNewDialog = () => {
        fetchDialogs();
    };

    window.fetchDialogs = fetchDialogs;

    useEffect(() => {
        if (items.length) {
            onChangeInput();
        }
    });

    useEffect(() => {
        if (!items.length) {
            fetchDialogs();
        } else {
            setFilteredItems(items);
        }

        socket.on('SERVER:DIALOG_CREATED', onNewDialog());
        return () => socket.removeListener('SERVER:NEW_MESSAGE', onNewDialog);
    }, []);

    return (
        <BaseDialogs
            items={filtered}
            userId={userId}
            onSearch={onChangeInput}
            inputValue={inputValue}
            onSelectDialog={setCurrentDialogId}
            currentDialogId={currentDialogId}
        />
    );
};

export default connect(
    ({ dialogs }) => dialogs,
    dialogsActions,
)(Dialogs);
