import express from 'express';
import socket from 'socket.io';

import { DialogModel, MessageModel } from "../models";

class DialogController {
    io: socket.Server;

    constructor(io: socket.Server) {
        this.io = io;
    }

    index = (req: any, res: express.Response): void => {
        const userId = req.user._id;

        DialogModel.find()
            .or([{ author: userId }, { partner: userId }])
            .populate(['author', 'partner'])
            .populate({
                path: 'lastMessage',
                populate: {
                    path: 'user',
                },
            })
            .exec(function (err, dialogs) {
                if (err) {
                    return res.status(404).json({
                        message: 'Dialogs not found',
                    });
                }
                return res.json(dialogs);
            });
    };

    create = (req: any, res: express.Response): void => {
        const postData = {
            author: req.user._id,
            partner: req.body.partner,
        };

        DialogModel.findOne(
            {
                author: req.user._id,
                partner: req.body.partner,
            },
            (err, dialog) => {
                if (err) {
                    return res.status(500).json({
                        status: 'error',
                        message: err,
                    });
                }
                if (dialog) {
                    return res.status(403).json({
                        status: 'error',
                        message: 'Такой диалог уже есть',
                    });
                } else {
                    const dialog = new DialogModel(postData);

                    dialog
                        .save()
                        .then((dialogObj) => {
                            const message = new MessageModel({
                                text: req.body.text,
                                user: req.user._id,
                                dialog: dialogObj._id,
                            });

                            message
                                .save()
                                .then(() => {
                                    dialogObj.lastMessage = message._id;
                                    dialogObj.save().then(() => {
                                        res.json(dialogObj);
                                        this.io.emit('SERVER:DIALOG_CREATED', {
                                            ...postData,
                                            dialog: dialogObj,
                                        });
                                    });
                                })
                                .catch((reason) => {
                                    res.json(reason);
                                });
                        })
                        .catch((err) => {
                            res.json({
                                status: 'error',
                                message: err,
                            });
                        });
                }
            },
        );
    };

    delete = (req: any, res: express.Response): void => {
        const id: string = req.params.id;
        DialogModel.findOneAndRemove({ _id: id })
            .then((dialog) => {
                if (dialog) {
                    res.json({
                        message: `Dialog deleted`,
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

export default DialogController;
