import { apiElement } from "./core";

const api = {
    register: apiElement("POST", "/user/create"),
    login: apiElement("POST", "/user/login"),
    postResetpassword: apiElement("POST", "/user/resetpassword"),
    postForgotpassword: apiElement("POST", "/user/forgotpassword"),
    auth: apiElement("GET", "/user/auth"),
    topic: apiElement("GET", "/topic"),
    getChallengeList: apiElement("GET", "/challenge"),
    putUpdateAccountForm: apiElement("PUT", "/user/update"),
    getQuestion: apiElement("GET", "question"),
    checkAnswer: apiElement("POST", `/answer/:questionId`),
    checkChallengeAnswers: apiElement("POST", "/challenge/check-answers"),
    getRankList: apiElement("GET", "/challenge/rank"),
    getMostPlayedChallenge: apiElement("GET", "/challenge/most-played"),
};

export default api;
