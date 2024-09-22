import "./Question.css";
import { Link } from "react-router-dom";
const Question = ({ question }) => {
  return (
    <Link to={`/questions/${question.id}`}
      state={{ id: question.id }}
    >
      <div className="question-container">
        <h1 className="author">{question.author}</h1>
        <p className="timestamp">{new Date(question.timestamp).toLocaleString()}</p>
      </div>
    </Link>
  );
};

export default Question;