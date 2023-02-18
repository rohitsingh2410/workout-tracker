import React, { Component } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
  Message,
} from "semantic-ui-react";
import "../Styles/RegisterPage.css";
import { Validators } from "../Validators";
import { ApiCalls } from "../ApiCalls";
const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "others" },
];

class RegisterPage extends Component {
  state = {
    name: "",
    email: "",
    gender: "",
    password: "",
    confirm: "",
    err_name: "",
    err_email: "",
    err_gender: "",
    err_password: "",
    err_confirm: "",
    reg_error: "",
    loading: false,
  };

  handleChange = async (e, { errClass, name, value }) => {
    if(this.state.reg_error){
      this.setState({ reg_error:""})
    }
    let status = await Validators.validateString(value, name);
    this.setState({ [name]: value });
    this.setState({
      [errClass]: status.message,
    });
    if (name === "confirm") {
      if (value !== this.state.password) {
        this.setState({
          err_confirm: "Passwords doesn't matches",
        });
      } else {
        this.setState({
          err_confirm: "",
        });
      }
    }
  };
  async register(e) {
    e.preventDefault();
    this.setState({ loading: true });
    const { name, email, gender, password } = this.state;
    let data = {
      username: email,
      email: email,
      password: password,
      gender: gender,
      name: name,
    };
    let user = await ApiCalls.registerUser(data);
    console.log("user",user)
    if (!user.status) {
      this.setState({ reg_error: user.message });
    }
    this.setState({ loading: false });
  }
  redirect(path) {
    window.location = path;
  }
  render() {
    const {
      name,
      email,
      gender,
      password,
      confirm,
      err_name,
      err_confirm,
      err_email,
      err_gender,
      err_password,
      reg_error,
      loading,
    } = this.state;
    return (
      <div className="register-page-container">
        <div className="register-page-form">
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Name"
                name="name"
                errClass="err_name"
                value={name}
                placeholder="Full name"
                onChange={this.handleChange}
                error={
                  err_name
                    ? {
                        content: err_name,
                        pointing: "below",
                      }
                    : null
                }
              />
              <Form.Field
                control={Input}
                label="Email"
                errClass="err_email"
                placeholder="Email"
                value={email}
                onChange={this.handleChange}
                name="email"
                error={
                  err_email
                    ? {
                        content: err_email,
                        pointing: "below",
                      }
                    : null
                }
              />
              <Form.Field
                control={Select}
                label="Gender"
                errClass="err_gender"
                onChange={this.handleChange}
                name="gender"
                value={gender}
                options={options}
                placeholder="Gender"
                error={
                  err_gender
                    ? {
                        content: err_gender,
                        pointing: "below",
                      }
                    : null
                }
              />
              <Form.Field
                control={Input}
                label="Password"
                errClass="err_password"
                name="password"
                value={password}
                onChange={this.handleChange}
                placeholder="Password"
                error={
                  err_password
                    ? {
                        content: err_password,
                        pointing: "below",
                      }
                    : null
                }
              />
              <Form.Field
                control={Input}
                name="confirm"
                errClass="err_confirm"
                label="Confirm Password"
                onChange={this.handleChange}
                value={confirm}
                placeholder="Confirm Password"
                error={
                  err_confirm
                    ? {
                        content: err_confirm,
                        pointing: "below",
                      }
                    : null
                }
              />
            </Form.Group>
            {reg_error ? (
              <Message negative>
                <Message.Header>{reg_error}</Message.Header>
              </Message>
            ) : null}
            <div className="form-group-end">
              {loading ? (
                <Button loading>Loading</Button>
              ) : (
                <Button basic color="blue" onClick={(e) => this.register(e)}>
                  Register
                </Button>
              )}

              <span style={{ marginTop: "5%" }}>
                Already have an account?{" "}
                <a
                  style={{ color: "blue" }}
                  onClick={(e) => this.redirect("/login")}
                >
                  Login here
                </a>
              </span>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
