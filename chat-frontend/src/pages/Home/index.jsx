import React from 'react';
import { TeamOutlined, FormOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button } from "antd";

import { Dialogs, Messages, ChatInput, Status } from "../../containers";

import './Home.scss';

const Home = () => (
    <section className='home'>
        <div className="chat">
            <div className="chat__sidebar">
                <div className="chat__sidebar-header">
                    <div>
                        <TeamOutlined/>
                        <span>Dialogs</span>
                    </div>
                    <Button type="link" shape="circle" icon={<FormOutlined/>}/>
                </div>
                <div className="chat__sidebar-dialogs">
                    <Dialogs items={[
                        {
                            _id: '125cb962ac59075b964b07152d234b70',
                            text: "We describe our work every day and I drink coffee",
                            isRead: false,
                            created_at: new Date(2019, 2, 13),
                            user: {
                                _id: '125cb962ac59075b964b07152d234b70',
                                fullname: "Korobko",
                                // avatar: 'https://i1.sndcdn.com/artworks-000211382041-014zjh-t500x500.jpg'
                            },
                        },
                        {
                            _id: '202cb962ac59075b964b07152d234b70',
                            text: "We describe our work every day and I drink coffee",
                            isRead: false,
                            created_at: new Date(),
                            user: {
                                _id: '202cb962ac59075b964b07152d234b70',
                                isOnline: true,
                                fullname: "Petro Petrov",
                                avatar: 'https://i1.sndcdn.com/artworks-000211382041-014zjh-t500x500.jpg'
                            },
                        },
                        {
                            _id: '202cb962ac59075b964b07152d234b70',
                            text: "We describe our work every day and I drink coffee",
                            isRead: false,
                            created_at: new Date(2019, 2, 13),
                            user: {
                                _id: '202cb962ac59075b964b07152d234b70',
                                fullname: "Solovey",
                                // avatar: 'https://i1.sndcdn.com/artworks-000211382041-014zjh-t500x500.jpg'
                            },
                        },
                        {
                            _id: '202cb962ac59075b964b07152d234b70',
                            text: "We describe our work every day and I drink coffee",
                            isRead: false,
                            created_at: new Date(),
                            user: {
                                _id: '202cb962ac59075b964b07152d234b70',
                                isOnline: true,
                                fullname: "Sahrad",
                                avatar: 'https://i1.sndcdn.com/artworks-000211382041-014zjh-t500x500.jpg'
                            },
                        },
                        {
                            _id: '23scb962ac59075b964b07152d234b70',
                            text: "We describe our work every day and I drink coffee",
                            isRead: false,
                            created_at: new Date(2019, 2, 13),
                            user: {
                                _id: '23scb962ac59075b964b07152d234b70',
                                fullname: "Portnyagin",
                                // avatar: 'https://i1.sndcdn.com/artworks-000211382041-014zjh-t500x500.jpg'
                            },
                        },
                        {
                            _id: '202cb962ac59075b964b07152d234b70',
                            text: "We describe our work every day and I drink coffee",
                            isRead: false,
                            created_at: new Date(),
                            user: {
                                _id: '202cb962ac59075b964b07152d234b70',
                                isOnline: true,
                                fullname: "Pan Taras",
                                avatar: 'https://i1.sndcdn.com/artworks-000211382041-014zjh-t500x500.jpg'
                            },
                        },
                    ]}/>
                </div>
            </div>
            <div className="chat__dialog">
                <div className="chat__dialog-header">
                    <div/>
                    <Status online/>
                    <Button type="link" shape="circle" icon={<EllipsisOutlined/>}/>
                </div>
                <div className="chat__dialog-messages">
                    <Messages/>
                </div>
                <div className="chat__dialog-input">
                    <ChatInput/>
                </div>
            </div>
        </div>
    </section>
);

export default Home;
