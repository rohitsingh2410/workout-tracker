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
  { key: "o", text: "Other", value: "other" },
];

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    confirm: "",
    err_email: "",
    err_gender: "",
    err_password: "",
    buttonbusy: false,
    loginError: "",
  };

  handleChange = async (e, { errClass, name, value }) => {
    let { loginError } = this.state;
    if (loginError) {
      this.setState({
        loginError: "",
      });
    }
    let status = await Validators.validateString(value, name);
    this.setState({
      [errClass]: status.message,
    });
    if (name === "confirm") {
      if (this.state.confirm !== this.state.password) {
        this.setState({
          err_confirm: "Passwords doesn't matches",
        });
      } else {
        this.setState({
          err_confirm: "",
        });
      }
    }
    this.setState({ [name]: value });
  };
  async login(e) {
    e.preventDefault();
    this.setState({ buttonbusy: true });
    let { email, password } = this.state;
    let payload = {
      identifier: email,
      password: password,
    };
    console.log(payload);
    let loginUser = await ApiCalls.login(payload);
    console.log("loginUser", loginUser);
    if (!loginUser.status) {
      this.setState({
        loginError: loginUser.data,
        buttonbusy: false,
      });
    } else {
      // redirectt and save jwt.
      window.location = "/feed";
    }
  }
  redirect(path) {
    window.location = path;
  }
  sendMail(e) {
    e.preventDefault();

    window.location.href = "support@vtx.com";
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
      loginError,
      err_password,
      buttonbusy,
    } = this.state;
    return (
      <div className="register-page-container">
        <div className="register-page-form">
          <Form>
            <Form.Group widths="equal">
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
            </Form.Group>
            {loginError ? <Message color="red">{loginError}</Message> : ""}
            <div className="form-group-end">
              {buttonbusy ? (
                <Button
                  basic
                  color="blue"
                  disabled={true}
                  onClick={(e) => this.login(e)}
                >
                  Loggin in ......
                </Button>
              ) : (
                <Button basic color="blue" onClick={(e) => this.login(e)}>
                  Login
                </Button>
              )}

              <span style={{ marginTop: "5%" }}>
                Need an account?{" "}
                <a
                  style={{ color: "blue" }}
                  onClick={(e) => this.redirect("/register")}
                >
                  Create One
                </a>
              </span>
              <span style={{ marginTop: "5%" }}>
                Need Help? <a href="mailto:info@info.eu">Click Here</a>
              </span>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
