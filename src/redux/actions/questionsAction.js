import {saveQuestion, saveQuestionAnswer} from "../../api/api";
import {saveAnswerUser, saveQuestionUser} from "./userAction";
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

export function handleCreateQuestion(firstOption, secondOption) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        return saveQuestion(firstOption, secondOption, authedUser)
            .then((question) => {
                dispatch(createQuestion(question));
                dispatch(saveQuestionUser(question))
            })
    };
}

export function handleVoteQuestion(questionId, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        return saveQuestionAnswer(authedUser.id, questionId, answer)
            .then(() => {
                dispatch(voteQuestion(authedUser.id, questionId, answer));
                dispatch(saveAnswerUser(authedUser.id, questionId, answer));
            });
    };
}
