import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

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

  doSubmit = () => {
    alert(
      `Request Sent : username:${this.state.data.username},password:${this.state.data.password},`
    );
    //call the server
  };

  render() {
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
