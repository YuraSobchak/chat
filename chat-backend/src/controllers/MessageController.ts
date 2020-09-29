import express from 'express';
import { MessageModel } from "../models";

class MessageController {

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

    create(req: express.Request, res: express.Response) {
        const userId: string = req.user._id;

        const postData = {
            text: req.body.text,
            user: userId,
            dialog: req.body.dialog_id,
        };
        const message = new MessageModel(postData);
        message.save()
            .then((obj: any) => {
                res.json(obj);
            })
            .catch(reason => {
                res.json(reason);
            })
        ;
    }

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
