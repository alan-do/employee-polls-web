export const GET_USERS = "GET_USERS";
export const SAVE_ANSWER_USER = "SAVE_ANSWER_USER";
export const SAVE_QUESTION_USER = "SAVE_QUESTION_USER";

export function getUsers(users) {
    return {
        type: GET_USERS,
        users,
    };
}

export function saveAnswerUser(authedUser, qid, answer) {
    return {
        type: SAVE_ANSWER_USER,
        authedUser,
        qid,
        answer,
    };
}

export function saveQuestionUser({author, id}) {
    return {
        type: SAVE_QUESTION_USER,
        author,
        qid: id,
    };
}
