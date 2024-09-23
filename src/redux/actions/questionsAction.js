import { saveQuestion, saveQuestionAnswer } from "../../api/api";
import { saveAnswerUser, saveQuestionUser } from "./userAction";
export const CREATE_QUESTION = "CREATE_QUESTION";
export const VOTE_QUESTION = "VOTE_QUESTION";
export const GET_QUESTIONS = "GET_QUESTIONS";

export function getQuestions(questions) {
    return {
        type: GET_QUESTIONS,
        questions,
    };
}
function createQuestion(question) {
    return {
        type: CREATE_QUESTION,
        question,
    };
}

function voteQuestion(author, qid, answer) {
    return {
        type: VOTE_QUESTION,
        author,
        qid,
        answer,
    };
}

export function handleCreateQuestion(optionOneText, optionTwoText, authenticatedUser) {
    return (dispatch) => {
        return saveQuestion(optionOneText, optionTwoText, authenticatedUser)
            .then((question) => {
                dispatch(createQuestion(question));
                dispatch(saveQuestionUser(question))
            })
    };
}

export function handleVoteQuestion(authenticatedUser, questionId, answer) {
    return (dispatch) => {

        return saveQuestionAnswer(authenticatedUser.id, questionId, answer)
            .then(() => {
                dispatch(voteQuestion(authenticatedUser.id, questionId, answer));
                dispatch(saveAnswerUser(authenticatedUser.id, questionId, answer));
            });
    };
}
