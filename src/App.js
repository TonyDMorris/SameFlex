import React from "react";
import { Router, Link } from "@reach/router";
import User from "./views/user";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import NavMenu from "./components/nav";
import { Container, Row, Col } from "shards-react";
import Home from "./views/home";

import "./style.css";

const App = () => {
  return (
    <Container className="col-12">
      <NavMenu />
      <Router>
        <Home path="/" />
        <User path="/user" />;
      </Router>
    </Container>
  );
};

export default App;
