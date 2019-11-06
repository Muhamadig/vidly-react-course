import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { Redirect } from "react-router-dom";
import { login, getCurrentUser } from "../services/authService";
class LoginForm extends Form {
  state = { data: { username: "", password: "" }, errors: {} };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    const { state } = this.props.location;

    try {
      await login(this.state.data);
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const { errors } = this.state;
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h1 className="h3 text-center">Login</h1>
          {this.renderInput("Username", "text", "username", true)}
          {this.renderInput("Password", "password", "password")}

          {this.renderSubmitForm("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
