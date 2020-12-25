import express from 'express';
import bcrypt from 'bcrypt';
import { validationResult, Result, ValidationError } from "express-validator";

import {UserModel} from "../models";
import {IUser} from "../models/User";
import {createJWTToken} from "../utils";
import socket from "socket.io";
import {strict} from "assert";
import {stringify} from "querystring";

class UserController {
    io: socket.Server;

    constructor(io: socket.Server) {
        this.io = io;
    }

    show = (req: express.Request, res: express.Response): void => {
        const id: string = req.params.id;
        UserModel.findById(id, (err, user) => {
            if (err) {
                return res.status(404).json({
                    message: "Not found"
                });
            }
            res.json(user);
        });
    };

    findUsers = (req: express.Request, res: express.Response): void => {
        const query: any = req.query.query;
        UserModel.find()
            .or([
                { fullname: new RegExp(query, "i") },
                { email: new RegExp(query, "i") },
            ])
            .then((users: IUser[]) => res.json(users))
            .catch((err: any) => {
                return res.status(404).json({
                    status: "error",
                    message: err,
                });
            });
    };


    me = (req: any, res: express.Response): void => {
        const id: string = req.user._id;
        UserModel.findById(id, (err, user: any) => {
            if (err) {
                return res.status(404).json({
                    message: "Not found"
                });
            }
            console.log(user.isOnline);
            res.json(user);
        });
    };

    create = (req: express.Request, res: express.Response): void => {
        const postData = {
            email: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password,
        };

        const errors: Result<ValidationError> = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            const user = new UserModel(postData);

            user.save()
                .then((obj: any) => {
                    res.json(obj);
                })
                .catch(reason => {
                    res.status(500).json({
                        status: "error",
                        message: reason,
                    });
                })
            ;
        }
    };

    delete = (req: express.Request, res: express.Response): void => {
        const id: string = req.params.id;
        UserModel.findOneAndRemove({ _id: id })
            .then((user) => {
                if (user) {
                    res.json({
                        message: `User ${user.fullname} deleted`,
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

    login = (req: express.Request, res: express.Response): void => {
        const postData: { email: string; password: string } = {
            email: req.body.email,
            password: req.body.password,
        };

        const errors: Result<ValidationError> = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            UserModel.findOne({email: postData.email}, (err, user: IUser) => {
                if (err || !user) {
                    return res.status(404).json({
                        message: "User not found",
                    });
                }

                if (bcrypt.compareSync(postData.password, user.password)) {
                    const token = createJWTToken(user);
                    res.json({
                        status: "success",
                        token,
                    });
                } else {
                    res.status(403).json({
                        status: "error",
                        message: "Incorrect password or email",
                    });
                }
            });
        }
    };

    verify = (req: express.Request, res: express.Response): void => {
        const hash: any =  req.query.hash;

        console.log(hash);
        if (!hash) {
            res.status(422).json({ errors: "Invalid hash" });
        } else {
            UserModel.findOne({ confirm_hash: hash }, (err: any, user: IUser) => {
                if (err || !user) {
                    return res.status(404).json({
                        status: "error",
                        message: "Hash not found",
                    });
                }

                user.confirmed = true;
                user.save((err: any) => {
                    if (err) {
                        return res.status(404).json({
                            status: "error",
                            message: err,
                        });
                    }

                    res.json({
                        status: "success",
                        message: "Аккаунт успешно подтвержден!",
                    });
                });
            });
        }
    };
}

export default UserController;
