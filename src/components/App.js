import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./auth/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleInitialData } from "../redux/actions/sharedAction";
import NotFound from "../components/common/NotFound";
import DashBoard from "./dashboard/Dashboard";
import Navigation from "./navigation/Navigation";
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

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PrivateRoute><DashBoard /></PrivateRoute>} />

        <Route path="/404" exact element={<NotFound />} />

      </Routes>
    </Router>
  );
};

export default App;
