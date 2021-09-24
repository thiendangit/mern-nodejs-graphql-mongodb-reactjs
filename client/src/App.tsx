import Home from "pages/Home";
import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Register from "pages/Register";
import Login from "pages/Login";
import {MenuBar} from "components/MenuBar";

const App: React.FC = () => (
  <Router >
    <div >
      <MenuBar />
      <Route exact path="/" >
        <Home />
      </Route >
      <Route path="/login" >
        <Login />
      </Route >
      <Route path="/register" >
        <Register />
      </Route >
    </div >
  </Router >
);

export default App;
