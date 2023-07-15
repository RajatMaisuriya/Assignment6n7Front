import React, { Component } from "react";
import ApiService from "../api/todoapi";

// creating object for calling api methods.
const apiService = new ApiService();

//login page
class Login extends Component {
  // constructor
  constructor(props) {
    super(props);

    // creating state variable.
    this.state = {
      email: "",
      password: "",
    };
  }

  // changing state of variables.
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Routing to sigup page.
  jumptoSignup = () => {
    window.location.href = "/signup";
  };

  // Calling login method on submitting.
  handleSubmit = (e) => {
    e.preventDefault();
    this.userLogin();
  };

  // calling login api method for checking
  userLogin() {
    const { email, password } = this.state;

    // calling api method for validating login.
    apiService
      .user_Login(email, password)
      .then((response) => {
        if (response.status) {
          console.log("***********" + JSON.stringify(response));
          console.log("***********" + JSON.stringify(response.status));

          // set session
          localStorage.setItem("userID", response.status);

          // redirect to todo page.
          window.location.href = "/todo";
        } else {
          window.alert("Invalid login");
        }
      })
      .catch((error) => {
        window.alert("Error Validating user:" + error);
      });
  }

  // design of login page.
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
