import { SAVE_ANSWER_USER, SAVE_QUESTION_USER, GET_USERS } from "../actions/userAction";

export default function users(state = {}, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                ...action.users,
            };
        case SAVE_ANSWER_USER:
            return {
                ...state,
                [action.authenticatedUser]: {
                    ...state[action.authenticatedUser],
                    answers: {
                        ...state[action.authenticatedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            };
        case SAVE_QUESTION_USER:
            return {
                ...state,
                [action.author]: {
                    ...state[action.author],
                    questions: state[action.author].questions.concat(action.qid)
                }
            };
        default:
            return state;
    }
}
