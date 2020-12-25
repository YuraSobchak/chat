import React from "react";
import {FormOutlined, TeamOutlined} from "@ant-design/icons";
import {Button, Modal, Form, Select, Input} from "antd";

import "./Sidebar.scss";

import {Dialogs} from "../../containers";

const { Option } = Select;
const { TextArea } = Input;

const Sidebar = ({
     user,
     visible,
     onShow,
     onClose,
     users,
     onSearch,
     isSearching,
     inputValue,
     messageText,
     onChangeInput,
     onChangeTextArea,
     onSelectUser,
     selectedUserId,
     onModalOk
}) => {
    const options = users.map(user => <Option key={user._id}>{user.fullname}</Option>);

    return (
        <div className="chat__sidebar">
            <div className="chat__sidebar-header">
                <div>
                    <TeamOutlined/>
                    <span>Dialogs</span>
                </div>
                <Button
                    onClick={onShow}
                    type="link"
                    shape="circle"
                    icon={<FormOutlined/>}/>
            </div>
            <div className="chat__sidebar-dialogs">
                <Dialogs user={ user && user._id }/>
            </div>
            <Modal
                title="Create dialog"
                visible={visible}
                onCancel={onClose}
                footer={[
                    <Button key="back" onClick={onClose}>
                        Close
                    </Button>,
                    <Button
                        disabled={!messageText}
                        key="submit"
                        type="primary"
                        loading={isSearching}
                        onClick={onModalOk}>
                        Create
                    </Button>,
                ]}>
                <Form className="add-dialog-form">
                    <Form.Item label="Insert username or email">
                        <Select
                            value={inputValue}
                            onSearch={onSearch}
                            onChange={onChangeInput}
                            onSelect={onSelectUser}
                            notFoundContent={null}
                            style={{ width: '100%' }}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            placeholder="Insert username or email"
                            showSearch>
                            { options }
                        </Select>
                    </Form.Item>
                    {selectedUserId && <Form.Item label="Type message">
                        <TextArea
                            autosize={{ minRows: 3, maxRows: 10 }}
                            onChange={onChangeTextArea}
                            value={messageText}
                        />
                    </Form.Item>}
                </Form>
            </Modal>
        </div>
    );
};

export default Sidebar;
