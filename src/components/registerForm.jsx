import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = { data: { username: "", password: "", name: "" }, errors: {} };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(6)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = () => {
    alert(
      `Request Sent : username:${this.state.data.username},password:${this.state.data.password},name:${this.state.data.name}`
    );
    //call the server
  };

  render() {
    return (
      <div>
        <form className="form-register" onSubmit={this.handleSubmit}>
          <h1 className="h3 text-left">Register</h1>
          {this.renderInput("Username", "text", "username", true)}
          {this.renderInput("Password", "password", "password")}
          {this.renderInput("Name", "text", "name")}

          {this.renderSubmitForm("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
