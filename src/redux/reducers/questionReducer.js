import { VOTE_QUESTION, CREATE_QUESTION, GET_QUESTIONS } from "../actions/questionsAction";

export default function questions(state = {}, action) {
    switch (action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                ...action.questions,
            };
        case CREATE_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question,
            };
        case VOTE_QUESTION:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat(action.author)
                    }
                }
            };
        default:
            return state;
    }
}
