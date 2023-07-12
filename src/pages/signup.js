import React, { Component } from "react";
import ApiService from "../api/todoapi";

const apiService = new ApiService();

class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      name: "",
      userName: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.signUpUser();
  };

  componentDidMount() {}

  signUpUser() {
    const { name, userName, password } = this.state;

    apiService
      .addUser(name, userName, password)
      .then((response) => {
        if (response) {
          window.location.href = "/";
        } else {
          window.alert(response.message);
        }
      })
      .catch((error) => {
        window.alert("Error while Sign Up user:" + error);
      });
  }

  render() {
    const { name, userName, password } = this.state;

    return (
      <div>
        <div className="container">
          <h1>Sign Up</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="userName"
                name="userName"
                id="userName"
                value={userName}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={this.handleChange}
                required
              />
            </div>
            <button type="submit" className="btn">
              Sign Up
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Back to login.
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default signup;
