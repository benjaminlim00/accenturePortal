import React from "react";
import "../styles/LoginPage.css";

import { Redirect } from "react-router-dom";

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      error: false,
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange = e => {
    // {name,value} = e.target;
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // {name,value} = e.target;
    if (
      this.state.username === "benjamin" &&
      this.state.password === "password"
    ) {
      this.setState({
        redirect: true
      });
    } else {
      this.setState({
        error: true
      });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/requests" />;
    }

    let errorText;
    this.state.error
      ? (errorText = "Username or password is wrong, please try again")
      : (errorText = "");
    return (
      <div className="login-page">
        <div className="form">
          <form className="register-form">
            <input type="text" placeholder="name" />
            <input type="password" placeholder="password" />
            <input type="text" placeholder="email address" />
            <button>create</button>
            <p className="message">
              Already registered? <a href="#">Sign In</a>
            </p>
          </form>
          <form className="login-form" onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />

            <p className="error-text">{errorText}</p>
            <button>login</button>
            <p className="message">
              Not registered? <a href="#">Create an account</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
