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
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="optionOne"
                        className="label">First Option</label>
                    <div className="input-container">
                        <input
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
                        className="label">Second Option</label>
                    <div className="input-container">
                        <input
                            value={optionTwo}
                            onChange={onChangeOptionTwo}
                            type="text"
                            name="optionTwo"
                            id="optionTwo"
                            className="input" />
                    </div>
                </div>

                <div className="button-container">
                    <button type="submit"
                        className="button">
                        Submit
                    </button>
                </div>

            </form>
        </div>
    );
};

export default CreatePoll;