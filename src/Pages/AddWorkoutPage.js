import React, { Component } from "react";
import { Tab, Button } from "semantic-ui-react";
import AddWorkoutComponent from "../components/AddWorkoutComponent";
import HeaderComponent from "../components/HeaderComponent";
import "../Styles/AddWorkout.css";

export default class AddWorkoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataAvailable: false,
      splitName: "",
      splitComments: "",
      splitDetailsAdded: false,
      dailyLog: [
        {
          name: "workout Monday",
          workouts: [],
        },
        {
          name: "workout Tuesday",
          workouts: [],
        },
        {
          name: "workout Wednesday",
          workouts: [],
        },
        {
          name: "workout Thursday",
          workouts: [],
        },
        {
          name: "workout Friday",
          workouts: [],
        },
        {
          name: "workout Saturday",
          workouts: [],
        },
        {
          name: "workout Sunday",
          workouts: [],
        },
      ],
    };
  }
  setDailyLog(e) {
    this.setState({
      dailyLog: e,
    });
  }
  setSplitDetails(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  submitSplit(e) {
    e.preventDefault();
    this.setState({
      splitDetailsAdded: true,
    });
  }
  render() {
    let { dailyLog, splitDetailsAdded, splitName, splitComments } = this.state;
    return (
      <div className="workout-page-container">
        <HeaderComponent
          iconName="tasks"
          headerMainContent={
            splitDetailsAdded ? "Add Workouts" : "Add workout splits"
          }
          subheader=""
        />
        {splitDetailsAdded ? (
          <>
            <div className="workout-day-slider">
              <Tab
                menu={{ fluid: true, vertical: true, tabular: true }}
                panes={[
                  {
                    menuItem: "Mon",
                    render: () => (
                      <Tab.Pane>
                        <AddWorkoutComponent
                          day={"Monday"}
                          setDailyLog={(e) => this.setDailyLog(e)}
                          dailyLog={dailyLog}
                          idx={0}
                        />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: "Tue",
                    render: () => (
                      <Tab.Pane>
                        <AddWorkoutComponent
                          day={"Tuesday"}
                          setDailyLog={(e) => this.setDailyLog(e)}
                          dailyLog={dailyLog}
                          idx={1}
                        />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: "Wed",
                    render: () => (
                      <Tab.Pane>
                        {" "}
                        <AddWorkoutComponent
                          day={"Wednesday"}
                          setDailyLog={(e) => this.setDailyLog(e)}
                          dailyLog={dailyLog}
                          idx={2}
                        />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: "Thu",
                    render: () => (
                      <Tab.Pane>
                        {" "}
                        <AddWorkoutComponent
                          day={"Thursday"}
                          setDailyLog={(e) => this.setDailyLog(e)}
                          dailyLog={dailyLog}
                          idx={3}
                        />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: "Fri",
                    render: () => (
                      <Tab.Pane>
                        {" "}
                        <AddWorkoutComponent
                          day={"Friday"}
                          setDailyLog={(e) => this.setDailyLog(e)}
                          dailyLog={dailyLog}
                          idx={4}
                        />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: "Sat",
                    render: () => (
                      <Tab.Pane>
                        {" "}
                        <AddWorkoutComponent
                          day={"Saturday"}
                          setDailyLog={(e) => this.setDailyLog(e)}
                          dailyLog={dailyLog}
                          idx={5}
                        />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: "Sun",
                    render: () => (
                      <Tab.Pane>
                        {" "}
                        <AddWorkoutComponent
                          day={"Sunday"}
                          setDailyLog={(e) => this.setDailyLog(e)}
                          dailyLog={dailyLog}
                          idx={6}
                        />
                      </Tab.Pane>
                    ),
                  },
                ]}
              />
            </div>
            <div className="workout-action">
              <Button.Group>
                <Button>Cancel</Button>
                <Button.Or />
                <Button positive>Save</Button>
              </Button.Group>
            </div>
          </>
        ) : (
          <div className="split-details">
            <input
              placeholder="Split Name* "
              name="splitName"
              onChange={(e) => this.setSplitDetails(e)}
              value={splitName}
            />
            <textarea
              placeholder="Comments (Optional)"
              name="splitComments"
              value={splitComments}
              onChange={(e) => this.setSplitDetails(e)}
            />
            <Button
              positive
              disabled={splitName ? false : true}
              onClick={(e) => this.submitSplit(e)}
            >
              Proceed
            </Button>
          </div>
        )}
      </div>
    );
  }
}
