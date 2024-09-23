import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./auth/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleInitialData } from "../redux/actions/sharedAction";

import NotFound from "../components/common/NotFound";
import QuestionDetail from "./QuestionDetail/QuestionDetail";
import DashBoard from "./dashboard/Dashboard";
import Navigation from "./navigation/Navigation";
import Leaderboard from "./leaderboard/Leaderboard";
import CreatePoll from "./createPoll/CreatePoll";

import { useSelector } from "react-redux";
const App = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.authenticatedUser);

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);
  return (
    <Router>
      {isAuthenticated ? <Navigation /> : null}
      <Routes>

        <Route path="/login" exact element={<Login />} />

        <Route path="/" exact element={<PrivateRoute><DashBoard /></PrivateRoute>} />

        <Route path="/404" exact element={<NotFound />} />

        <Route path="/questions/:id" exact element={<QuestionDetail />} />

        <Route path="/leaderboard" exact element={<PrivateRoute><Leaderboard /></PrivateRoute>} />

        <Route path="/add" exact element={<PrivateRoute><CreatePoll /></PrivateRoute>} />

      </Routes>
    </Router>
  );
};

export default App;
