import mongoose from 'mongoose';
import express from 'express';
import bodyParser from "body-parser";

import { UserModel } from './schemas';
import { UserController } from './controllers';

const app = express();

app.use(bodyParser.json());

const User = new UserController();

mongoose.connect('mongodb://localhost:27017/chat', {
    useNewUrlParser: true,
    useCreateIndex: true
});

app.get('/user/:id', User.show);
app.delete('/user/:id', User.delete);
app.post('/user/registration', User.create);

app.listen(3000, function () {
    console.log("Example listening")
});
