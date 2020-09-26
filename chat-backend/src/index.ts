import mongoose from 'mongoose';
import express from 'express';
import bodyParser from "body-parser";
import dotenv from 'dotenv';

import { UserController, DialogController, MessageController } from './controllers';
import { updateLastSeen, checkAuth } from './middleware';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(updateLastSeen);
// app.use(checkAuth);

const User = new UserController();
const Dialog = new DialogController();
const Message = new MessageController();

mongoose.connect('mongodb://localhost:27017/chat', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.get('/user/:id', User.show);
app.delete('/user/delete/:id', User.delete);
app.post('/user/registration', User.create);
app.post('/user/login', User.login);

app.get('/dialogs', Dialog.index);
app.delete('/dialog/delete/:id', Dialog.delete);
app.post('/dialog/create', Dialog.create);

app.get('/dialog/messages/:id', Message.index);
app.delete('/dialog/messages/:id', Message.delete);
app.post('/dialog/messages', Message.create);

app.listen(process.env.PORT, function () {
    console.log(`Server: http://localhost:${process.env.PORT}`)
});
