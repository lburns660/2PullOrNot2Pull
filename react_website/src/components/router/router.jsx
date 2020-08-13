import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import IntubationForm from "../intubation-form";
import Dashboard from "../dashboard";

export default function App() {
  return (
    <Router>
      <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <img
              alt="wwc-data-science-logo"
              width="112"
              height="28"
              src="https://repository-images.githubusercontent.com/255145344/05fd3e80-9526-11ea-98e6-8e2e5e97c2c7"
            />
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/">
                Dashboard
              </Link>
              <Link className="navbar-item" to="/add-patient">
                Add a patient
              </Link>
            </div>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/add-patient">
            <IntubationForm />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
