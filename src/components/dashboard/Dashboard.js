import { useSelector } from "react-redux";
import Question from "../common/Question/Question";
import "./Dashboard.css";
import { useState, useMemo } from "react";

const Dashboard = () => {
    const [showUnanswered, setShowUnanswered] = useState(true);
    const authenticatedUser = useSelector((state) => state.authenticatedUser);
    const questions = useSelector((state) => {
        const questionsArray = state.questions ? Object.values(state.questions) : [];
        return questionsArray;
    });
    
    const sortedQuestions = useMemo(() => {
        return questions.sort((a, b) => b.timestamp - a.timestamp);
    }, [questions]);
    const users = useSelector((state) => state.users);

    const unanswered = (question) => (!question.optionOne.votes.includes(authenticatedUser.id)
        && !question.optionTwo.votes.includes(authenticatedUser.id));

    const answered = (question) => (question.optionOne.votes.includes(authenticatedUser.id)
        || question.optionTwo.votes.includes(authenticatedUser.id));

    return (
        <div className="section-questions" data-testid="section-questions">
            <button className="btn-toggle" onClick={() => setShowUnanswered(!showUnanswered)}>
                {showUnanswered ? "Show Answered Questions" : "Show Unanswered Questions"}
            </button>
            {showUnanswered ? (
                <>
                    <h2 className="section-title">Unanswered Questions</h2>
                    <ul className="grid-section">
                        {sortedQuestions.filter(unanswered).length > 0 ? (
                            sortedQuestions
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
                </>
            ) : (
                <>
                    <h2 className="section-title-answered">Answered Questions</h2>
                    <ul className="grid-section">
                        {sortedQuestions.filter(answered).length > 0 ? (
                            sortedQuestions
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
                </>
            )}
        </div>
    );
}

export default Dashboard;