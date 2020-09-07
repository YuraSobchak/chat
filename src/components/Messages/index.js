import React from 'react';
import PropTypes from 'prop-types';
import { Empty } from "antd";

import { Message } from "../index";

const Messages = ({ items }) => {
    return items ? (
        <div>
            <Message
                avatar="https://i1.sndcdn.com/artworks-000204201549-x5dej8-t500x500.jpg"
                date={new Date()}
                audio="https://freesound.org/data/previews/534/534017_321967-lq.mp3"
            />
            <Message
                avatar="https://i1.sndcdn.com/artworks-000211382041-014zjh-t500x500.jpg"
                text="Hello, bro!"
                date={Date.now()}
            />
            <Message
                avatar="https://i1.sndcdn.com/artworks-000204201549-x5dej8-t500x500.jpg"
                date={Date.now()}
                isMe={true}
                isRead={false}
                attachments={[
                    {
                        filename: 'image.jpg',
                        url: 'https://i1.sndcdn.com/artworks-000211382041-014zjh-t500x500.jpg'
                    }
                ]}
            />
            <Message
                avatar="https://i1.sndcdn.com/artworks-000211382041-014zjh-t500x500.jpg"
                isTyping
            />
            <Message
                avatar="https://i1.sndcdn.com/artworks-000204201549-x5dej8-t500x500.jpg"
                date={new Date()}
                audio="https://freesound.org/data/previews/534/534017_321967-lq.mp3"
            />
            <Message
                avatar="https://i1.sndcdn.com/artworks-000211382041-014zjh-t500x500.jpg"
                text="Hello, bro!"
                date={Date.now()}
            />
            <Message
                avatar="https://i1.sndcdn.com/artworks-000204201549-x5dej8-t500x500.jpg"
                date={Date.now()}
                isMe={true}
                isRead={false}
                attachments={[
                    {
                        filename: 'image.jpg',
                        url: 'https://i1.sndcdn.com/artworks-000211382041-014zjh-t500x500.jpg'
                    }
                ]}
            />
            <Message
                avatar="https://i1.sndcdn.com/artworks-000211382041-014zjh-t500x500.jpg"
                isTyping
            />
            <Message
                avatar="https://i1.sndcdn.com/artworks-000204201549-x5dej8-t500x500.jpg"
                date={new Date()}
                audio="https://freesound.org/data/previews/534/534017_321967-lq.mp3"
            />
            <Message
                avatar="https://i1.sndcdn.com/artworks-000211382041-014zjh-t500x500.jpg"
                text="Hello, bro!"
                date={Date.now()}
            />
            <Message
                avatar="https://i1.sndcdn.com/artworks-000204201549-x5dej8-t500x500.jpg"
                date={Date.now()}
                isMe={true}
                isRead={false}
                attachments={[
                    {
                        filename: 'image.jpg',
                        url: 'https://i1.sndcdn.com/artworks-000211382041-014zjh-t500x500.jpg'
                    }
                ]}
            />
            <Message
                avatar="https://i1.sndcdn.com/artworks-000211382041-014zjh-t500x500.jpg"
                isTyping
            />
        </div>
    ) : (
        <Empty/>
    );
};

Messages.propTypes = {
    items: PropTypes.array,
};

export default Messages;
