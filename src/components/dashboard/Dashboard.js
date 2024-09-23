import { useSelector } from "react-redux";
import Question from "../common/Question/Question";
import "./Dashboard.css";

const Dashboard = () => {
    const authenticatedUser = useSelector((state) => state.authenticatedUser);
    const questions = useSelector((state) => {
        const questionsArray = Object.values(state.questions);
        return questionsArray.sort((a, b) => b.timestamp - a.timestamp);
    });
    
    const users = useSelector((state) => state.users);

    const unanswered = (question) => (!question.optionOne.votes.includes(authenticatedUser.id)
        && !question.optionTwo.votes.includes(authenticatedUser.id));

    const answered = (question) => (question.optionOne.votes.includes(authenticatedUser.id)
        || question.optionTwo.votes.includes(authenticatedUser.id));

    const questionsArray = questions ? Object.values(questions) : [];

    return (
        <div className="section-questions" data-testid="section-questions">
            <h2 className="section-title">Unanswered Questions</h2>
            <ul className="grid-section">
                {questionsArray.filter(unanswered).length > 0 ? (
                    questionsArray
                        .filter(unanswered)
                        .map((question) => (
                            <li key={question.id}>
                                <Question question={question} author={users[question.author]}/>
                            </li>
                        ))
                ) : (
                    <li className="text-center">No unanswered questions</li>
                )}
            </ul>
            <h2 className="section-title">Answered Questions</h2>
            <ul className="grid-section">
                {questionsArray.filter(answered).length > 0 ? (
                    questionsArray
                        .filter(answered)
                        .map((question) => (
                            <li key={question.id}>
                                <Question question={question} author={users[question.author]}/>
                            </li>
                        ))
                ) : (
                    <li className="text-center">No answered questions</li>
                )}
            </ul>
        </div>
    );
}

export default Dashboard;