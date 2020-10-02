import { axios } from '../../core';

export default {
    signIn: postData => axios.post("/user/signin", postData),
    getMe: () => axios.get("/user/me"),
};
