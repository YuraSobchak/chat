import {UserModel} from "../models";
import express from "express";

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    UserModel.updateOne(
        {
            _id: '5f6ce974096b024caaea691a',
        },
        {
            $set: {
                last_seen: new Date()
            }
        },
        () => {}
    );
    next();
}