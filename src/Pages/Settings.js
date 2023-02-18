import React, { Component } from "react";
import {
  Accordion,
  Icon,
  Form,
  Header,
  TextArea,
  Button,
} from "semantic-ui-react";
import HeaderComponent from "../components/HeaderComponent";
import { ApiCalls } from "../ApiCalls";

export default class Settings extends Component {
  state = {
    activeIndex: 0,
    msg: "",
    showFeedbackLoader: false,
    feedbacksubmited: false,
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
  logout = async (e) => {
    await localStorage.clear();
    window.location = "/login";
  };
  submit = async (e) => {
    e.preventDefault();
    this.setState({
      showFeedbackLoader: true,
    });
    let { msg } = this.state;
    if (msg) {
      let info = await ApiCalls.setFeedback(msg);
      if (info.status) {
        this.setState({
          showFeedbackLoader: false,
          feedbacksubmited: true,
          msg: "",
        });
      }
    }
  };

  async feedbackChangeHandler(e) {
    let { feedbacksubmited } = this.state;
    if (feedbacksubmited) {
      this.setState({
        feedbacksubmited: false,
      });
    }
    this.setState({
      msg: e.target.value,
    });
  }

  render() {
    const { activeIndex, showFeedbackLoader,msg, feedbacksubmited } = this.state;

    return (
      <div>
        <HeaderComponent
          iconName="settings"
          headerMainContent="Settings"
          subheader=""
        />
        <Accordion styled>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            Report an Issue or Feedback
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Form>
              <TextArea
                placeholder="Tell us more"
                onChange={(e) => this.feedbackChangeHandler(e)}
                style={{ minHeight: 100 }}
                value={msg}
              />
              {showFeedbackLoader ? (
                <Button
                  basic
                  color="blue"
                  disabled={true}
                  onClick={(e) => this.submit(e)}
                >
                  Submitting..
                </Button>
              ) : (
                <Button basic color="blue" onClick={(e) => this.submit(e)}>
                  Submit
                </Button>
              )}
              {feedbacksubmited ? (
                <div className="no-workout-sign">
                  <Header size="tiny">
                    <Icon disabled name="bullhorn" size="large" />
                    Thank you for your feedback we will reach out to you via
                    email soon !!
                  </Header>
                </div>
              ) : null}
            </Form>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            Logout
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <Button basic color="blue" onClick={(e) => this.logout(e)}>
              Logout
            </Button>
          </Accordion.Content>
        </Accordion>
      </div>
    );
  }
}
