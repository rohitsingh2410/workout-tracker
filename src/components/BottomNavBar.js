import React, { Component } from "react";
import { ApiCalls } from "../ApiCalls.js";
import "../Styles/BottomNavBar.css";
export default class BottomNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dontShow: false,
    };
  }
  async componentDidMount() {
    //await ApiCalls.getuserInfo()
    console.log("window. location. href.", window.location.href.split("/"));
    if (
      window.location.href.split("/")[3] === "login" ||
      window.location.href.split("/")[3] === "register"
    ) {
      this.setState({
        dontShow: true,
      });
    } else {
      await ApiCalls.getuserInfo();
    }
  }
  redirect(e, path) {
    window.location = path;
  }
  render() {
    const { dontShow } = this.state;
    if (dontShow) {
      <></>;
    } else {
      return (
        <div class="bottom-nav-menu">
          <a class="item" onClick={(e) => this.redirect(e, "/feed")}>
            <i class="home icon"></i>
          </a>
          <a class="item" onClick={(e) => this.redirect(e, "/stats")}>
            <i class="chart bar icon"></i>
          </a>
          <a class="item" onClick={(e) => this.redirect(e, "/community")}>
            <i class="globe icon"></i>
          </a>
        </div>
      );
    }
  }
}
