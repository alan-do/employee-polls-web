import {connect} from "react-redux";
import { useSelector } from "react-redux";
import Question from "../common/Question/Question";
import "./Dashboard.css";

const Dashboard = () => {
    const authenticatedUser = useSelector((state) => state.authenticatedUser);
    const questions = Object.values(useSelector((state) => state.questions));
    const users = useSelector((state) => state.users);

    const unanswered = (question) => (!question.optionOne.votes.includes(authenticatedUser.id)
        && !question.optionTwo.votes.includes(authenticatedUser.id));

    const answered = (question) => (question.optionOne.votes.includes(authenticatedUser.id)
        || question.optionTwo.votes.includes(authenticatedUser.id));

    return (
        <div className="section-questions">
            <h2 className="section-title">New Questions</h2>
            <ul className="grid-section">
                {questions.filter(unanswered).length > 0 ? (
                    questions
                        .filter(unanswered)
                        .map((question) => (
                            <li key={question.id}>
                                <Question question={question} author={users[question.author]}/>
                            </li>
                        ))
                ) : (
                    <li className="text-center">Không có câu hỏi mới</li>
                )}
            </ul>

            <h2 className="section-title">Answered Questions</h2>
            <ul className="grid-section">
                {questions.filter(answered).length > 0 ? (
                    questions
                        .filter(answered)
                        .map((question) => (
                            <li key={question.id}>
                                <Question question={question} author={users[question.author]}/>
                            </li>
                        ))
                ) : (
                    <li className="text-center">Không có câu hỏi mới</li>
                )}
            </ul>
        </div>
    );
}

const mapStateToProps = ({authedUser, questions, users}) => ({
    authedUser,
    questions: Object.values(questions).sort(
        (a, b) => b.timestamp - a.timestamp
    ),
    users,
});

export default connect(mapStateToProps)(Dashboard);
