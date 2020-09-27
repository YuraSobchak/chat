import jwt from "jsonwebtoken";
import {IUser} from "../models/User";

export default (token: string) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_TOKEN || "", (err: any, decodedToken) => {
            if (err || !decodedToken) {
                reject(err);
            }

            resolve(decodedToken);
        })
    });

