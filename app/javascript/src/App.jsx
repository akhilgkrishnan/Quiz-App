import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <div>Home Sample</div>} />
        <Route exact path="/about" render={() => <div>About</div>} />
      </Switch>
    </Router>
  );
};

export default App;
