import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import Login from "../components/auth/Login";
import { handleInitialData } from "../redux/actions/sharedAction";
import authReducer from "../redux/reducers/authReducer";

const createMockStore = (initialState) => {
    return configureStore({
        reducer: {
            authenticatedUser: authReducer,
        },
        preloadedState: initialState,
    });
};

describe("Login", () => {
    it("should render the component", () => {
        const mockStore = createMockStore({});
        const { container } = render(
            <Provider store={mockStore}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );
        expect(container).toBeDefined();
        expect(container).toMatchSnapshot();
    });
});