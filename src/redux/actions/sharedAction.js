import {getUsers} from "./userAction";
import {getQuestions} from "./questionsAction";
import {getInitialData} from "../../api/api";

export function handleInitialData() {
    return async (dispatch) => {
        const { users, questions } = await getInitialData();
        dispatch(getUsers(users));
        dispatch(getQuestions(questions));
    };
}
