import express from 'express';
import {UserModel} from "../models";
import {IUser} from "../models/User";
import {createJWTToken} from "../utils";

class UserController {

    show(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        UserModel.findById(id, (err, user) => {
            if (err) {
                return res.status(404).json({
                    message: "Not found"
                });
            }
            res.json(user);
        });
    }

    create(req: express.Request, res: express.Response) {
        const postData = {
            email: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password,
        };
        const user = new UserModel(postData);
        user.save()
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

    login(req: express.Request, res: express.Response) {
        const postData = {
            email: req.body.email,
            password: req.body.password
        };

        UserModel.findOne({ email: postData.email }, (err, user: IUser) => {
            if (err) {
                return res.status(404).json({
                    message: "Not found"
                });
            }

            if (user.password === postData.password) {
                const token = createJWTToken(user);

                res.json({
                    status: 'success',
                    token
                })
            } else {
                res.json({
                    status: 'error',
                    message: 'Incorrect password or email'
                })
            }
        });

    }
}

export default UserController;
