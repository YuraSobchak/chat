import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { dialogsActions } from "../redux/actions";
import { Dialogs as BaseDialogs } from "../components";
import socket from "../core/socket";

const Dialogs = ({ fetchDialogs, currentDialogId, items, userId }) => {
    const [inputValue, setValue] = useState("");
    const [filtered, setFilteredItems] = useState(Array.from(items));

    const onChangeInput = (value = '') => {
        setFilteredItems(
            items.filter(
                dialog =>
                    dialog.author.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
                    dialog.partner.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0,
            ),
        );
        setValue(value);
    };

    window.fetchDialogs = fetchDialogs;

    useEffect(() => {
        if (items.length) {
            onChangeInput();
        }
    }, [items]);

    useEffect(() => {
        fetchDialogs();

        socket.on('SERVER:DIALOG_CREATED', fetchDialogs);
        socket.on('SERVER:NEW_MESSAGE', fetchDialogs);
        return () => {
            socket.removeListener('SERVER:DIALOG_CREATED', fetchDialogs);
            socket.removeListener('SERVER:NEW_MESSAGE', fetchDialogs);
        };
    }, []);

    return (
        <BaseDialogs
            items={filtered}
            userId={userId}
            onSearch={onChangeInput}
            inputValue={inputValue}
            currentDialogId={currentDialogId}
        />
    );
};

export default connect(
    ({ dialogs }) => dialogs,
    dialogsActions,
)(Dialogs);
