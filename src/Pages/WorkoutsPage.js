import React, { Component } from "react";
import {
  Icon,
  Label,
  Menu,
  Table,
  Button,
  Accordion,
  Form,
} from "semantic-ui-react";
import HeaderComponent from "../components/HeaderComponent";
import "../Styles/WorkoutPage.css";
import { SAMPLE_PPL } from "../Config/config";

const ColorForm = (
  <Form>
    <Form.Group grouped>
      <Form.Checkbox label="Red" name="color" value="red" />
      <Form.Checkbox label="Orange" name="color" value="orange" />
      <Form.Checkbox label="Green" name="color" value="green" />
      <Form.Checkbox label="Blue" name="color" value="blue" />
    </Form.Group>
  </Form>
);

const SizeForm = (
  <Form>
    <Form.Group grouped>
      <Form.Radio label="Small" name="size" type="radio" value="small" />
      <Form.Radio label="Medium" name="size" type="radio" value="medium" />
      <Form.Radio label="Large" name="size" type="radio" value="large" />
      <Form.Radio label="X-Large" name="size" type="radio" value="x-large" />
    </Form.Group>
  </Form>
);

export default class WorkoutsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      split: null,
      activeIndex: 0,
    };
  }
  async componentDidMount() {
    this.setState({
      split: SAMPLE_PPL,
    });
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <div className="workout-page-container">
        <HeaderComponent
          iconName="anchor"
          headerMainContent="PUSH PULL LEGS"
          subheader="6 days split "
        />
        <div className="workout-page-split-section">
          <Accordion as={Menu} vertical>
            <Menu.Item>
              <Accordion.Title
                active={activeIndex === 0}
                content="Size"
                index={0}
                onClick={this.handleClick}
              />
              <Accordion.Content
                active={activeIndex === 0}
                content={SizeForm}
              />
            </Menu.Item>

            <Menu.Item>
              <Accordion.Title
                active={activeIndex === 1}
                content="Colors"
                index={1}
                onClick={this.handleClick}
              />
              <Accordion.Content
                active={activeIndex === 1}
                content={ColorForm}
              />
            </Menu.Item>
          </Accordion>
        </div>
      </div>
    );
  }
}
