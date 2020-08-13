import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Router } from "./components/";

function App() {
  return (
    <>
      <div className="container">
        <div className="section is-fullheight">
          <Router />
        </div>
      </div>
    </>
  );
}

export default App;
