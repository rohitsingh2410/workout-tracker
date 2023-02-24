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
  Dimmer,
  Loader,
  Image,
  Segment,
} from "semantic-ui-react";
import HeaderComponent from "../components/HeaderComponent";
import WorkoutInputTableComponent from "../components/WorkoutInputTableComponent";
import "../Styles/WorkoutPage.css";
import { SAMPLE_PPL } from "../Config/config";
import { ApiCalls } from "../ApiCalls";

export default class WorkoutsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      split: [],
      activeIndex: 0,
      dayIndex: 0,
      activeTab: 0,
      splitName: "",
      splitComments: "",
      dates:[]
    };
  }
  async componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const id = query.get("id");
    let dates=await ApiCalls.getCurrentWeek()
    let getWorkoutByID = await ApiCalls.getWorkoutByID(id);
    console.log("getWorkoutByID", getWorkoutByID);
    console.log(id); //123
    let d = new Date();
    let dayIndex = d.getDay();
    this.setState({
      split: getWorkoutByID.data.attributes.workouts,
      activeTab: dayIndex-1,
      splitComments: getWorkoutByID.data.attributes.SplitName,
      splitName: getWorkoutByID.data.attributes.Description,
      dates:dates
    });
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
  handleTabChange = (e, { activeTab }) => this.setState({ activeTab });

  render() {
    const { activeIndex, activeTab, split, splitName, splitComments, dates } =
      this.state;
    if (split.length === 0) {
      <Segment>
        <Dimmer active>
          <Loader size="mini">Loading</Loader>
        </Dimmer>

        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </Segment>;
    } else {
      return (
        <div className="workout-page-container">
          <HeaderComponent
            iconName="anchor"
            headerMainContent={splitName}
            subheader={splitComments}
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
                        {split[0].workouts.map((elem, idx) => {
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
                                        date:dates[0]
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
                        {split[1].workouts.map((elem, idx) => {
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
                                        date:dates[1]
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
                        {split[2].workouts.map((elem, idx) => {
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
                                        date:dates[2]
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
                        {split[3].workouts.map((elem, idx) => {
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
                                        date:dates[3]
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
                        {split[4].workouts.map((elem, idx) => {
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
                                        date:dates[4]
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
                        {split[5].workouts.map((elem, idx) => {
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
                                        date:dates[5]
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
                        {split[6].workouts.map((elem, idx) => {
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
                                        date:dates[6]
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
}
