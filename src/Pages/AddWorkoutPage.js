import React, { Component } from "react";
import { Tab, Button } from "semantic-ui-react";
import { ApiCalls } from "../ApiCalls";
import AddWorkoutComponent from "../components/AddWorkoutComponent";
import HeaderComponent from "../components/HeaderComponent";
import "../Styles/AddWorkout.css";

export default class AddWorkoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busyButton:false,
      id:null,
      isDataAvailable: false,
      splitName: "",
      splitComments: "",
      splitDetailsAdded: false,
      editMode: false,
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
  async componentDidMount(){
    console.log("Current URL",window.location.href)
    if(window.location.href.split("/")[3]==="editworkout"){
      const query = new URLSearchParams(this.props.location.search);
      const id = query.get("id");
      let dates=await ApiCalls.getCurrentWeek()
      let getWorkoutByID = await ApiCalls.getWorkoutByID(id);
      let prevLog=getWorkoutByID.data.attributes.workouts
      console.log("getWorkoutByID",getWorkoutByID)
      this.setState({
        id:id,
        splitDetailsAdded:true,
        editMode:true,
        dailyLog:prevLog,
        splitName:getWorkoutByID.data.attributes.splitName,
        splitComments:getWorkoutByID.data.attributes.splitComments
      })
    }
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
  async submit(e, type) {
    e.preventDefault();
    this.setState({
      busyButton:true
    })
    const{editMode,id}=this.state;
    console.log("type", type);
    if (type === "cancel") {
      window.location = "/feed";
    }
    console.log("workout json", this.state);
    let workout = {
      splitName: this.state.splitName,
      splitComments: this.state.splitComments,
      dailyLog: this.state.dailyLog,
    };
    if(editMode){
      delete workout.dailyLog;
      workout['workouts']=this.state.dailyLog;
      let update = await ApiCalls.updateWorkout({data:workout},id);
      if(update.status){
        window.location = "/feed";
      }
    }
    else{
      let create = await ApiCalls.createWorkout(workout);
    if(create.status){
      window.location = "/feed";
    }
    console.log("create", create);
    }
  }
  render() {
    let { dailyLog, splitDetailsAdded, splitName, splitComments,busyButton ,editMode} = this.state;
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
                menu={{ secondary: true, pointing: true }}
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
                <Button onClick={(e) => this.submit(e, "cancel")}>
                  Cancel
                </Button>
                <Button.Or />
                {busyButton?<Button positive disabled={true}>
                  {"Saving.."}
                </Button>:
                <Button positive onClick={(e) => this.submit(e, "submit")}>
                  {editMode?"Update & finish":"Save & finish"}
                </Button>}
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
