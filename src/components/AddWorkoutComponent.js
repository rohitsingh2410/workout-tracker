import React, { Component } from "react";
import { Icon, Label, Menu, Table, Button } from "semantic-ui-react";

export default class AddWorkoutComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "",
      sets: "",
      reps: "",
      index: 0,
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

  async componentDidMount() {
    let indexTOConsiderReference = {
      monday: 0,
      tuesday: 1,
      wednesday: 2,
      thursday: 3,
      friday: 4,
      saturday: 5,
      sunday: 6,
    };
    let index = this.props.idx;
    console.log("day", this.props.day, index);
    this.setState({
      dailyLog: this.props.dailyLog,
    });
  }

  handleWorkoutChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.idx !== this.props.idx) {
      return true;
    }
  }
  setWorkout(e) {
    e.preventDefault();
    var { sets, reps, current, dailyLog } = this.state;
    let newLog = dailyLog;
    let data = {
      name: current,
      sets: sets,
      reps: reps,
    };
    newLog[this.props.idx].workouts.push(data);
    this.setState({
      dailyLog: newLog,
      current: "",
    });
    this.props.setDailyLog(newLog);
  }
  rem(idx){
    let newLog = this.state.dailyLog;
    let filtered = newLog[this.props.idx].workouts.filter(function(workout){
      return workout.name!==idx
    })
    newLog[this.props.idx].workouts=filtered;
    this.props.setDailyLog(newLog);
    console.log("rem",idx);
  }
  render() {
    var { sets, reps, current, dailyLog } = this.state;
    return (
      <div className="add-workout-component-container">
        <div className="workout-add-section">
          <span>
            Add workout for {this.props.day} {this.props.idx}:
          </span>
          <input
            placeholder="add workout name"
            onChange={(e) => this.handleWorkoutChange(e)}
            name="current"
            value={current}
          />

          <input
            placeholder="Reps"
            type="number"
            name="reps"
            onChange={(e) => this.handleWorkoutChange(e)}
            value={reps}
          />
          <input
            placeholder="Sets"
            type="number"
            name="sets"
            onChange={(e) => this.handleWorkoutChange(e)}
            value={sets}
          />
          <button
            disabled={current && sets && reps ? false : true}
            onClick={(e) => this.setWorkout(e)}
          >
            Add
          </button>
        </div>

        <div className="workout-table">
          <Table unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Workout</Table.HeaderCell>
                <Table.HeaderCell>Sets</Table.HeaderCell>
                <Table.HeaderCell>Reps</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {dailyLog[this.props.idx].workouts.map((elem) => {
                return (
                  <Table.Row key={elem.name}>
                    <Table.Cell>{elem.name}</Table.Cell>
                    <Table.Cell>{elem.sets}</Table.Cell>
                    <Table.Cell>{elem.reps}</Table.Cell>
                    <Table.Cell>
                    <Icon name="delete" color='red' size='large' onClick={(e,idx)=>this.rem(elem.name)}/>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}
