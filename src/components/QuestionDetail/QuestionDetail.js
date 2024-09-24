import { useNavigate, useLocation, useParams } from "react-router-dom"; // Thêm useParams
import { handleVoteQuestion } from "../../redux/actions/questionsAction";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import "./QuestionDetail.css";
import QuestionOption from "./components/QuestionOption";

const QuestionDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { id } = useParams(); // Lấy id từ URL
    const question = useSelector((state) => state.questions[id]); // Lấy câu hỏi từ state

    const authenticatedUser = useSelector((state) => state.authenticatedUser);
    const author = useSelector((state) => state.users[question?.author]);

    const [percentageOptionOne, setPercentageOptionOne] = useState(0);
    const [percentageOptionTwo, setPercentageOptionTwo] = useState(0);

    useEffect(() => {
        if (!authenticatedUser) {
            navigate("/login", { state: { from: location } });
        } else if (!question || !author) {
            navigate("/404");
        } else {
            const numberVotesTotal = question.optionOne.votes.length + question.optionTwo.votes.length;
            setPercentageOptionOne((question.optionOne.votes.length / numberVotesTotal * 100).toFixed(2));
            setPercentageOptionTwo((question.optionTwo.votes.length / numberVotesTotal * 100).toFixed(2));
        }
    }, [authenticatedUser, question, author, navigate, location]);

    if (!authenticatedUser || !question || !author) {
        return null;
    }

    const hasVotedForOptionOne = question.optionOne.votes.includes(authenticatedUser.id);
    const hasVotedForOptionTwo = question.optionTwo.votes.includes(authenticatedUser.id);
    const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

    const handleOption = (e, option) => {
        e.preventDefault();
        dispatch(handleVoteQuestion(authenticatedUser, question.id, option));
        const numberVotesTotal = question.optionOne.votes.length + question.optionTwo.votes.length + 1;
        if (option === "optionOne") {
            setPercentageOptionOne(((question.optionOne.votes.length + 1) / numberVotesTotal * 100).toFixed(2));
            setPercentageOptionTwo((question.optionTwo.votes.length / numberVotesTotal * 100).toFixed(2));
        } else {
            setPercentageOptionOne((question.optionOne.votes.length / numberVotesTotal * 100).toFixed(2));
            setPercentageOptionTwo(((question.optionTwo.votes.length + 1) / numberVotesTotal * 100).toFixed(2));
        }
    };

    const onVoteOptionOne = (e) => handleOption(e, "optionOne");
    const onVoteOptionTwo = (e) => handleOption(e, "optionTwo");

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
                    percentageVotes={percentageOptionOne}
                />
                <QuestionOption
                    option={question.optionTwo}
                    onVote={onVoteOptionTwo}
                    isAnswered={hasVoted}
                    isChoosen={hasVotedForOptionTwo}
                    percentageVotes={percentageOptionTwo}
                />
            </div>

        </div>
    );
};

export default QuestionDetail;
