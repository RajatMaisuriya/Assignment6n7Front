import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Todo from "./pages/todo";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
