import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import Dashboard from "../components/dashboard/Dashboard";
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

describe("Dashboard", () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createMockStore({
      authenticatedUser: { id: "sarahedo" },
      questions: {},
      users: {},
    });
  });

  it("should display the component", () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Dashboard />
        </Router>
      </Provider>
    );
    expect(screen.getByTestId("section-questions")).toBeInTheDocument();
  });

  it("should display the title for unanswered and answered questions", () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Dashboard />
        </Router>
      </Provider>
    );
    expect(screen.getByText("Unanswered Questions")).toBeInTheDocument();
    expect(screen.getByText("Answered Questions")).toBeInTheDocument();
  });
});
