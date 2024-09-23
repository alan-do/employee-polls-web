import { useNavigate, useLocation } from "react-router-dom";
import { handleVoteQuestion } from "../../redux/actions/questionsAction";
import { useDispatch, useSelector } from "react-redux";

import "./QuestionDetail.css";
import QuestionOption from "./components/QuestionOption";

const QuestionDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const question = location.state?.id;

    const authenticatedUser = useSelector((state) => state.authenticatedUser);
    const author = useSelector((state) => state.users[question?.author]);

    if (!authenticatedUser || !question || !author) {
        navigate("/404");
        return null;
    }

    const hasVotedForOptionOne = question.optionOne.votes.includes(authenticatedUser.id);
    const hasVotedForOptionTwo = question.optionTwo.votes.includes(authenticatedUser.id);
    const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

    const handleOption = (e, option) => {
        e.preventDefault();
        dispatch(handleVoteQuestion(authenticatedUser, question.id, option));
        navigate("/");
    };

    const onVoteOptionOne = (e) => handleOption(e, "optionOne");
    const onVoteOptionTwo = (e) => handleOption(e, "optionTwo");

    const calcPercentage = (option, question) => {
        const numberVotesTotal = question.optionOne.votes.length + question.optionTwo.votes.length;
        switch (option) {
            case "optionOne":
                return (question.optionOne.votes.length / numberVotesTotal * 100).toFixed(2) + " %";
            case "optionTwo":
                return (question.optionTwo.votes.length / numberVotesTotal * 100).toFixed(2) + " %";
            default:
                return "";
        }
    };

    return (
        <div>
            <button className="back-button" onClick={() => navigate(-1)}>
                <img
                    src={"../../../assets/back-button.png"}
                    alt="author"
                    className="back-button-image"
                />
                Back
            </button>
            <div className="author-container">
                <h1 className="author-name">Poll by {author.name}</h1>

                {hasVoted ? (
                    <p className="poll-status-answered">You voted for this option</p>
                ) : (
                    <p className="poll-status-unanswered">You haven't voted yet</p>
                )}
                <img src={author.avatarURL} alt="author" className="author-avatar" />
            </div>

            <h1 className="question-title">Would you rather?</h1>
            <div className={`options-container ${hasVoted ? 'answered' : 'unanswered'}`}>

                <QuestionOption
                    option={question.optionOne}
                    onVote={onVoteOptionOne}
                    isAnswered={hasVoted}
                    isChoosen={hasVotedForOptionOne}
                    percentageVotes={calcPercentage("optionOne", question)}
                />
                <QuestionOption
                    option={question.optionTwo}
                    onVote={onVoteOptionTwo}
                    isAnswered={hasVoted}
                    isChoosen={hasVotedForOptionTwo}
                    percentageVotes={calcPercentage("optionTwo", question)}
                />
            </div>

        </div>
    );
};

export default QuestionDetail;
