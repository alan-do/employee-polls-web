import "./QuestionOption.css";

const QuestionOption = ({
  option,
  onVote,
  isAnswered,
  isChoosen,
  percentageVotes,
}) => {
  return (
    <div className="option-container">
      <p className="option-text">{option.text}</p>
      <button
        disabled={isAnswered}
        className={`button-option ${isChoosen ? "choosen" : ""}`}
        onClick={onVote}
      >
        Vote
      </button>
      <p className="text-xs text-gray-500">
        Votes: {option.votes.length} ({percentageVotes}%)
      </p>
      {isChoosen && <p className="text-xs text-green-500">You choosed this option</p>}
    </div>
  );
};

export default QuestionOption;
