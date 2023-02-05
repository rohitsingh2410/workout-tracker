import React, { Component } from "react";
import {
  Icon,
  Label,
  Menu,
  Table,
  Button,
  Accordion,
  Form,
  Tab,
} from "semantic-ui-react";
import HeaderComponent from "../components/HeaderComponent";
import WorkoutInputTableComponent from "../components/WorkoutInputTableComponent";
import "../Styles/WorkoutPage.css";
import { SAMPLE_PPL } from "../Config/config";


export default class WorkoutsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      split: null,
      activeIndex: 0,
      dayIndex: 0,
      activeTab:5
    };
  }
  async componentDidMount() {
    let d = new Date();
    let dayIndex = d.getDay();
    this.setState({
      split: SAMPLE_PPL,
      dayIndex: dayIndex,
    });
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
  handleTabChange = (e, { activeTab }) => this.setState({ activeTab })

  render() {
    const { activeIndex ,activeTab} = this.state;

    return (
      <div className="workout-page-container">
        <HeaderComponent
          iconName="anchor"
          headerMainContent="PUSH PULL LEGS"
          subheader="6 days split "
        />
        <div className="workout-page-split-section">
          <div className="workout-day-slider">
            <Tab
            activeIndex={activeTab}
            onTabChange={this.handleTabChange}
              menu={{ secondary: true, pointing: true }}
              panes={[
                {
                  menuItem: "Mon",
                  render: () => (
                    <Tab.Pane>
                      {SAMPLE_PPL[0].workouts.map((elem, idx) => {
                        return (
                          <Accordion as={Menu} vertical>
                            <Menu.Item>
                              <Accordion.Title
                                active={activeIndex === idx}
                                content={
                                  elem.name +
                                  " ( " +
                                  elem.reps +
                                  "reps " +
                                  elem.sets +
                                  " sets)"
                                }
                                index={idx}
                                onClick={this.handleClick}
                              />
                              <Accordion.Content
                                active={activeIndex === idx}
                                content={
                                  <WorkoutInputTableComponent
                                    workoutDetails={{
                                      name: elem.name,
                                      reps: elem.reps,
                                      sets: elem.sets,
                                      id: elem.id,
                                    }}
                                  />
                                }
                              />
                            </Menu.Item>
                          </Accordion>
                        );
                      })}
                    </Tab.Pane>
                  ),
                },
                {
                  menuItem: "Tue",
                  render: () => (
                    <Tab.Pane>
                      {SAMPLE_PPL[1].workouts.map((elem, idx) => {
                        return (
                          <Accordion as={Menu} vertical>
                            <Menu.Item>
                              <Accordion.Title
                                active={activeIndex === idx}
                                content={
                                  elem.name +
                                  " ( " +
                                  elem.reps +
                                  "reps " +
                                  elem.sets +
                                  " sets)"
                                }
                                index={idx}
                                onClick={this.handleClick}
                              />
                              <Accordion.Content
                                active={activeIndex === idx}
                                content={
                                  <WorkoutInputTableComponent
                                    workoutDetails={{
                                      name: elem.name,
                                      reps: elem.reps,
                                      sets: elem.sets,
                                      id: elem.id,
                                    }}
                                  />
                                }
                              />
                            </Menu.Item>
                          </Accordion>
                        );
                      })}
                    </Tab.Pane>
                  ),
                },
                {
                  menuItem: "Wed",
                  render: () => (
                    <Tab.Pane>
                      {SAMPLE_PPL[2].workouts.map((elem, idx) => {
                        return (
                          <Accordion as={Menu} vertical>
                            <Menu.Item>
                              <Accordion.Title
                                active={activeIndex === idx}
                                content={
                                  elem.name +
                                  " ( " +
                                  elem.reps +
                                  "reps " +
                                  elem.sets +
                                  " sets)"
                                }
                                index={idx}
                                onClick={this.handleClick}
                              />
                              <Accordion.Content
                                active={activeIndex === idx}
                                content={
                                  <WorkoutInputTableComponent
                                    workoutDetails={{
                                      name: elem.name,
                                      reps: elem.reps,
                                      sets: elem.sets,
                                      id: elem.id,
                                    }}
                                  />
                                }
                              />
                            </Menu.Item>
                          </Accordion>
                        );
                      })}
                    </Tab.Pane>
                  ),
                },
                {
                  menuItem: "Thu",
                  render: () => (
                    <Tab.Pane>
                      {SAMPLE_PPL[3].workouts.map((elem, idx) => {
                        return (
                          <Accordion as={Menu} vertical>
                            <Menu.Item>
                              <Accordion.Title
                                active={activeIndex === idx}
                                content={
                                  elem.name +
                                  " ( " +
                                  elem.reps +
                                  "reps " +
                                  elem.sets +
                                  " sets)"
                                }
                                index={idx}
                                onClick={this.handleClick}
                              />
                              <Accordion.Content
                                active={activeIndex === idx}
                                content={
                                  <WorkoutInputTableComponent
                                    workoutDetails={{
                                      name: elem.name,
                                      reps: elem.reps,
                                      sets: elem.sets,
                                      id: elem.id,
                                    }}
                                  />
                                }
                              />
                            </Menu.Item>
                          </Accordion>
                        );
                      })}
                    </Tab.Pane>
                  ),
                },
                {
                  menuItem: "Fri",
                  render: () => (
                    <Tab.Pane>
                      {SAMPLE_PPL[4].workouts.map((elem, idx) => {
                        return (
                          <Accordion as={Menu} vertical>
                            <Menu.Item>
                              <Accordion.Title
                                active={activeIndex === idx}
                                content={
                                  elem.name +
                                  " ( " +
                                  elem.reps +
                                  "reps " +
                                  elem.sets +
                                  " sets)"
                                }
                                index={idx}
                                onClick={this.handleClick}
                              />
                              <Accordion.Content
                                active={activeIndex === idx}
                                content={
                                  <WorkoutInputTableComponent
                                    workoutDetails={{
                                      name: elem.name,
                                      reps: elem.reps,
                                      sets: elem.sets,
                                      id: elem.id,
                                    }}
                                  />
                                }
                              />
                            </Menu.Item>
                          </Accordion>
                        );
                      })}
                    </Tab.Pane>
                  ),
                },
                {
                  menuItem: "Sat",
                  render: () => (
                    <Tab.Pane>
                      {SAMPLE_PPL[5].workouts.map((elem, idx) => {
                        return (
                          <Accordion as={Menu} vertical>
                            <Menu.Item>
                              <Accordion.Title
                                active={activeIndex === idx}
                                content={
                                  elem.name +
                                  " ( " +
                                  elem.reps +
                                  "reps " +
                                  elem.sets +
                                  " sets)"
                                }
                                index={idx}
                                onClick={this.handleClick}
                              />
                              <Accordion.Content
                                active={activeIndex === idx}
                                content={
                                  <WorkoutInputTableComponent
                                    workoutDetails={{
                                      name: elem.name,
                                      reps: elem.reps,
                                      sets: elem.sets,
                                      id: elem.id,
                                    }}
                                  />
                                }
                              />
                            </Menu.Item>
                          </Accordion>
                        );
                      })}
                    </Tab.Pane>
                  ),
                },
                {
                  menuItem: "Sun",
                  render: () => (
                    <Tab.Pane>
                      {SAMPLE_PPL[6].workouts.map((elem, idx) => {
                        return (
                          <Accordion as={Menu} vertical>
                            <Menu.Item>
                              <Accordion.Title
                                active={activeIndex === idx}
                                content={
                                  elem.name +
                                  " ( " +
                                  elem.reps +
                                  "reps " +
                                  elem.sets +
                                  " sets)"
                                }
                                index={idx}
                                onClick={this.handleClick}
                              />
                              <Accordion.Content
                                active={activeIndex === idx}
                                content={
                                  <WorkoutInputTableComponent
                                    workoutDetails={{
                                      name: elem.name,
                                      reps: elem.reps,
                                      sets: elem.sets,
                                      id: elem.id,
                                    }}
                                  />
                                }
                              />
                            </Menu.Item>
                          </Accordion>
                        );
                      })}
                    </Tab.Pane>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    );
  }
}
