import { _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

export const getInitialData = async () => {
    const [users, questions] = await Promise.all([
        _getUsers(),
        _getQuestions(),
    ]);
    return {
        users,
        questions,
    };
}

export const saveQuestion = async (optionOneText, optionTwoText, author) => {
    return await _saveQuestion({ optionOneText, optionTwoText, author });
}

export const saveQuestionAnswer = async (authenticatedUserId, qid, answer) => {
    return await _saveQuestionAnswer({
        authedUser: authenticatedUserId,
        qid,
        answer
    });
}
