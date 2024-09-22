import Question from "../common/Question/Question";
import "./Dashboard.css";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const questions = useSelector((state) => state.questions);
    const authenticatedUser = useSelector((state) => state.authenticatedUser);

    const userNewQuestions = Object.values(questions).filter(question =>
        !authenticatedUser.answers[question.id] && question.author !== authenticatedUser.id
    );
    const userDoneQuestions = Object.values(questions).filter(question =>
        authenticatedUser.answers[question.id]
    );
    console.log('userNewQuestions', userNewQuestions);
    console.log('userDoneQuestions', userDoneQuestions);

    return (
        <div>
            <h2 className="section-title">New Questions</h2>
            <ul className="grid-section">
                {userNewQuestions.map((question) => (
                    <li key={question.id}>
                        <Question question={question} />
                    </li>
                ))}
            </ul>

            <h2 className="section-title">Answered Questions</h2>
            <ul className="grid-section">
                {userDoneQuestions.map((question) => (
                    <li key={question.id}>
                        <Question question={question} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
