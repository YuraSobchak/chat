import mongoose from 'mongoose';
import express from 'express';
import bodyParser from "body-parser";

import { UserController, DialogController, MessageController } from './controllers';
import { updateLastSeen } from './middleware';

const app = express();

app.use(bodyParser.json());
app.use(updateLastSeen);

const User = new UserController();
const Dialog = new DialogController();
const Message = new MessageController();

mongoose.connect('mongodb://localhost:27017/chat', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.get('/user/:id', User.show);
app.delete('/user/delete/:id', User.delete);
app.post('/user/registration', User.create);

app.get('/dialogs', Dialog.index);
app.delete('/dialog/delete/:id', Dialog.delete);
app.post('/dialog/create', Dialog.create);

app.get('/dialog/messages/:id', Message.index);
app.delete('/dialog/messages/:id', Message.delete);
app.post('/dialog/messages', Message.create);

app.listen(3000, function () {
    console.log("Example listening")
});
