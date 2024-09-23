import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleCreateQuestion } from "../../redux/actions/questionsAction";
import { useDispatch, useSelector } from "react-redux";
import "./CreatePoll.css";

const CreatePoll = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authenticatedUser = useSelector(state => state.authenticatedUser);
    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");
    const [error, setError] = useState("");

    const onChangeOptionOne = (e) => {
        const value = e.target.value;
        setOptionOne(value);
    };

    const onChangeOptionTwo = (e) => {
        const value = e.target.value;
        setOptionTwo(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (optionOne.trim() === "" || optionTwo.trim() === "") {
            setError("Both options must be filled.");
            return;
        }
        dispatch(handleCreateQuestion(
            optionOne,
            optionTwo,
            authenticatedUser.id,
        ));
        navigate("/");
    };

    return (
        <div>
            <h1 className="title">New Poll</h1>
            <form onSubmit={handleSubmit} className="form">
                
                <div className="form-group">
                    <label htmlFor="optionOne"
                        data-testid="optionOneLabel"
                        className="label">Option One</label>
                    <div className="input-container" data-testid="optionOne">
                        <input
                            data-testid="optionOneInput"
                            value={optionOne}
                            onChange={onChangeOptionOne}
                            type="text"
                            name="optionOne"
                            id="optionOne"
                            className="input" />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="optionTwo"
                        data-testid="optionTwoLabel"
                        className="label">Option Two</label>
                    <div className="input-container" data-testid="optionTwo">
                        <input
                            data-testid="optionTwoInput"
                            value={optionTwo}
                            onChange={onChangeOptionTwo}
                            type="text"
                            name="optionTwo"
                            id="optionTwo"
                            className="input" />
                    </div>
                </div>

                <div className="button-container">
                {error && <p className="error">{error}</p>}
                    <button type="submit"
                        data-testid="submit-poll"
                        className="button">
                        Submit
                    </button>
                </div>

            </form>
        </div>
    );
};

export default CreatePoll;