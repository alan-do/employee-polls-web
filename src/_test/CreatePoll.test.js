import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import CreatePoll from "../components/createPoll/CreatePoll";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/reducers/authReducer";
import questionsReducer from "../redux/reducers/questionReducer";
import usersReducer from "../redux/reducers/userReducer";

const createMockStore = (initialState) => {
    return configureStore({
        reducer: {
            authenticatedUser: authReducer,
            questions: questionsReducer,
            users: usersReducer,
        },
        preloadedState: initialState,
    });
};

describe("CreatePoll", () => {
    it("should render the component", () => {
        const view = render(
            <Provider store={createMockStore({})}>
                <Router>
                    <CreatePoll/>
                </Router>
            </Provider>
        );
        expect(view).toBeDefined();
        expect(view).toMatchSnapshot();
    });

    it("should display all elements", () => {
        render(
            <Provider store={createMockStore({})}>
                <Router>
                    <CreatePoll/>
                </Router>
            </Provider>
        );

        const optionOneLabelElement = screen.getByTestId("optionOneLabel");
        const optionOneInputElement = screen.getByTestId("optionOneInput");
        const optionTwoLabelElement = screen.getByTestId("optionTwoLabel");
        const optionTwoInputElement = screen.getByTestId("optionTwoInput");
        const submitButtonElement = screen.getByTestId("submit-poll");

        expect(optionOneLabelElement.textContent).toBe("Option One");
        expect(optionTwoLabelElement.textContent).toBe("Option Two");
        expect(submitButtonElement.textContent).toBe("Submit");

        fireEvent.change(optionOneInputElement, {target: {value: 'rent new office'}});
        fireEvent.change(optionTwoInputElement, {target: {value: 'rent old office'}});
        
        expect(optionOneInputElement.value).toBe("rent new office");
        expect(optionTwoInputElement.value).toBe("rent old office");
    });
});
