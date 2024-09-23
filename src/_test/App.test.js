import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import authReducer from "../redux/reducers/authReducer";
import { configureStore } from "@reduxjs/toolkit";

const createMockStore = (initialState) => {
    return configureStore({
        reducer: {
            authenticatedUser: authReducer,
        },
        preloadedState: initialState,
    });
};

describe("App", () => {
    let mockStore;

    beforeEach(() => {
        mockStore = createMockStore({
            authenticatedUser: null
        });
    });

    it("should render the component", () => {
        const view = render(
            <Provider store={mockStore}>
                <App />
            </Provider>
        );
        expect(view).toBeDefined();
        expect(view).toMatchSnapshot();
    });

    it("should show Login page when not logged in", () => {
        render(
            <Provider store={mockStore}>
                <App />
            </Provider>
        );
        const loginContainer = screen.getByTestId("login-container");
        expect(loginContainer).toBeInTheDocument();
    });

    it("should show Dashboard page when logged in", () => {
        mockStore.dispatch(login({ id: "sarahedo" }));

        render(
            <Provider store={mockStore}>
                <App />
            </Provider>
        );

        const dashboardContainer = screen.getByTestId("section-questions");
        expect(dashboardContainer).toBeInTheDocument();
    });
});