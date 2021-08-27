import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import { getFromLocalStorage } from "src/helpers/storage";

import Login from "components/Authentication/Login";
import PageLoader from "components/PageLoader";
import PrivateRoute from "components/Common/PrivateRoute";
import Dashboard from "components/Dashboard";

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
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Dashboard}
        />
      </Switch>
    </Router>
  );
};

export default App;
