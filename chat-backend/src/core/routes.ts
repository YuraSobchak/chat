import bodyParser from "body-parser";
import express from "express";
import socket from "socket.io";
import { updateLastSeen, checkAuth } from "../middleware";
import { LoginValidation, RegistrationValidation } from "../utils/validations";


import {
    UserCtrl,
    DialogCtrl,
    MessageCtrl,
} from "../controllers";

const createRoutes = (app: express.Express, io: socket.Server) => {
    const UserController = new UserCtrl(io);
    const DialogController = new DialogCtrl(io);
    const MessageController = new MessageCtrl(io);

    app.use(bodyParser.json());
    app.use(checkAuth);
    app.use(updateLastSeen);

    app.get("/", (_: express.Request, res: express.Response) => {
        res.send("Hello, World!");
    });

    app.get("/user/me", UserController.me);
    app.post("/user/signup", RegistrationValidation, UserController.create);
    app.post("/user/signin", LoginValidation, UserController.login);
    app.get("/user/:id", UserController.show);
    app.delete("/user/delete/:id", UserController.delete);

    app.get("/dialogs", DialogController.index);
    app.delete("/dialog/delete/:id", DialogController.delete);
    app.post("/dialog/create", DialogController.create);

    app.get("/dialog/messages/:id", MessageController.index);
    app.post("/dialog/addMessage", MessageController.create);
    app.delete("/messages/delete/:id", MessageController.delete);
};

export default createRoutes;
