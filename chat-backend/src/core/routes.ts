import bodyParser from "body-parser";
import express from "express";
import socket from "socket.io";
import { updateLastSeen, checkAuth } from "../middleware";
import { LoginValidation, RegistrationValidation } from "../utils/validations";


import multer from "./multer";
import {
    UserCtrl,
    DialogCtrl,
    MessageCtrl,
    UploadCtrl
} from "../controllers";

const createRoutes = (app: express.Express, io: socket.Server) => {
    const UserController = new UserCtrl(io);
    const DialogController = new DialogCtrl(io);
    const MessageController = new MessageCtrl(io);
    const UploadController = new UploadCtrl();

    app.use(bodyParser.json());
    app.use(checkAuth);
    app.use(updateLastSeen);

    app.get("/user/me", UserController.me);
    app.get("/user/verify", UserController.verify);
    app.post("/user/signup", RegistrationValidation, UserController.create);
    app.post("/user/signin", LoginValidation, UserController.login);
    app.get("/user/find", UserController.findUsers);
    app.get("/user/:id", UserController.show);
    app.delete("/user/delete/:id", UserController.delete);

    app.get("/dialogs", DialogController.index);
    app.delete("/dialog/delete/:id", DialogController.delete);
    app.post("/dialog/create", DialogController.create);

    app.get("/messages", MessageController.index);
    app.post("/dialog/addMessage", MessageController.create);
    app.delete("/messages/delete/:id", MessageController.delete);

    app.post("/files/add", multer.single("file"), UploadController.create);
    app.delete("/files/delete/:id", UploadController.delete);
};

export default createRoutes;
