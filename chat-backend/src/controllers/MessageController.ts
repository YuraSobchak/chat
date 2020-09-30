import express from 'express';
import socket from 'socket.io';

import { MessageModel, DialogModel } from "../models";
import { IMessage } from "../models/Message";

class MessageController {
    io: socket.Server;

    constructor(io: socket.Server) {
        this.io = io;
    }

    index = (req: express.Request, res: express.Response): void => {
        const dialogId = req.params.dialog;

        MessageModel.find()
            .populate(['dialog'])
            .exec(function (err, messages) {
                if (err) {
                    return res.status(404).json({
                        message: 'Messages not found',
                    });
                }
                return res.json(messages);
            });
    };

    create = (req: any, res: express.Response): void => {
        const userId: string = req.user._id;

        const postData = {
            text: req.body.text,
            dialog: req.body.dialog_id,
            attachments: req.body.attachments,
            user: userId,
        };

        const message = new MessageModel(postData);

        message
            .save()
            .then((obj: IMessage) => {
                obj.populate(
                    "dialog",
                    (err: any, message: IMessage) => {
                        if (err) {
                            return res.status(500).json({
                                status: "error",
                                message: err,
                            });
                        }
                        res.json(message);
                        this.io.emit("SERVER:NEW_MESSAGE", message);
                    }
                );
            })
            .catch((reason) => {
                res.json(reason);
            });
    };

    delete = (req: express.Request, res: express.Response): void => {
        const id: string = req.params.id;
        MessageModel.findOneAndRemove({ _id: id })
            .then((message) => {
                if (message) {
                    res.json({
                        message: `Message deleted`,
                    });
                } else {
                    res.status(404).json({
                        status: "error",
                    });
                }
            })
            .catch((err: any) => {
                res.json({
                    message: err,
                });
            });
    };
}

export default MessageController;
