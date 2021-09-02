import React, { useEffect, useState, createContext } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import { getFromLocalStorage } from "src/helpers/storage";

import Login from "components/Authentication/Login";
import PageLoader from "components/PageLoader";
import PrivateRoute from "components/Common/PrivateRoute";
import Dashboard from "components/Dashboard";
import CreateQuiz from "components/Quiz/CreateQuiz";
import EditQuiz from "components/Quiz/EditQuiz";

export const UserLoggedInContext = createContext();

const App = () => {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = getFromLocalStorage("isLoggedIn") === "true";

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <UserLoggedInContext.Provider value={isLoggedIn}>
        <ToastContainer />
        <Switch>
          <PrivateRoute
            path="/quiz/create"
            redirectRoute="/login"
            condition={isLoggedIn}
            component={CreateQuiz}
          />
          <Route exact path="/quiz/:id/edit" component={EditQuiz} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute
            path="/"
            redirectRoute="/login"
            condition={isLoggedIn}
            component={Dashboard}
          />
        </Switch>
      </UserLoggedInContext.Provider>
    </Router>
  );
};

export default App;
