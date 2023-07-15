import React, { Component } from "react";
import ApiService from "../api/todoapi";

const apiService = new ApiService();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  jumptoSignup = () => {
    window.location.href = "/signup";
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.userLogin();
  };

  userLogin() {
    const { email, password } = this.state;
    apiService
      .user_Login(email, password)
      .then((response) => {
        if (response.status) {
          console.log("***********" + JSON.stringify(response));
          console.log("***********" + JSON.stringify(response.status));
          localStorage.setItem("userID", response.status);
          window.location.href = "/todo";
        } else {
          window.alert("Invalid login");
        }
      })
      .catch((error) => {
        window.alert("Error Validating user:" + error);
      });
  }

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <div className="container">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
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
              Login
            </button>
            <button type="button" className="btn" onClick={this.jumptoSignup}>
              SignUp
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
