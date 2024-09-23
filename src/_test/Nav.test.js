import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import Nav from "../components/navigation/Navigation";
import authReducer from "../redux/reducers/authReducer";

const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      authenticatedUser: authReducer,
    },
    preloadedState: initialState,
  });
};

describe("Nav", () => {
    it("should render the component", () => {
        const mockStore = createMockStore({
          authenticatedUser: { id: "sarahedo", password: "" }
        });

        render(
            <Provider store={mockStore}>
                <Router>
                    <Nav/>
                </Router>
            </Provider>
        );
        expect(screen.getByRole("navigation")).toBeInTheDocument();
        expect(screen.getByRole("navigation")).toMatchSnapshot();
    });

    it("should display username of logged in user", () => {
        const mockStore = createMockStore({
          authenticatedUser: { id: "sarahedo", password: "" }
        });

        render(
            <Provider store={mockStore}>
                <Router>
                    <Nav/>
                </Router>
            </Provider>
        );

        const userInfoElement = screen.getByTestId("user-information");
        expect(userInfoElement.textContent).toBe("sarahedo");
    });
});
