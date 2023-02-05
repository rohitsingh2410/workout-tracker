import React, { Component } from "react";
import { Icon, Label, Menu, Table, Button } from "semantic-ui-react";
import "../Styles/WorkoutInputTable.css";

export default class WorkoutInputTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repsToPerform: 0,
      setsToPerform: 0,
      workoutName: "",
      details: [],
    };
  }
  componentDidMount() {
    const { workoutDetails } = this.props;
    console.log("workoutDetails", workoutDetails);
    let currentContent = [];
    for (let i = 0; i < workoutDetails.sets; i++) {
      currentContent.push({ reps: null, kg: null, done: false });
    }
    this.setState({
      repsToPerform: workoutDetails.reps,
      setsToPerform: workoutDetails.sets,
      workoutName: workoutDetails.name,
      details: currentContent,
    });
  }

  handleChange(e, idx) {
    console.log(e.target);
    let details = this.state.details;
    details[idx][e.target.name] = e.target.value;
    this.setState({
      [e.target.name]: e.target.value,
      details: details,
    });
  }
  handleCheck(e, idx) {
    let details = this.state.details;
    details[idx].done = !details[idx].done;
    this.setState({
      details: details,
    });
  }
  increaseSets(e) {
    e.preventDefault();
    let details = this.state.details;
    details.push({ reps: 0, kg: 0, done: false });
    this.setState({
      details: details,
    });
    console.log("added set");
  }
  render() {
    const { details } = this.state;
    console.log("details", details);
    return (
      <div className="input-table">
        <Table unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Set</Table.HeaderCell>
              <Table.HeaderCell>Lifted</Table.HeaderCell>
              <Table.HeaderCell>Kg</Table.HeaderCell>
              <Table.HeaderCell>Reps</Table.HeaderCell>
              <Table.HeaderCell>✅</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {details.map((elem, idx) => {
              return (
                <Table.Row>
                  <Table.Cell>{idx + 1}</Table.Cell>
                  <Table.Cell>
                    {details[idx].kg}*{details[idx].reps}
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      type="number"
                      placeholder="KG"
                      name="kg"
                      className="small-size-input"
                      value={details[idx].kg}
                      onChange={(e) => this.handleChange(e, idx)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      type="number"
                      placeholder="0"
                      className="small-size-input"
                      name="reps"
                      onChange={(e) => this.handleChange(e, idx)}
                      value={details[idx].reps}
                    />
                  </Table.Cell>

                  <Table.Cell>
                    <input
                      type="checkbox"
                      checked={details[idx].done}
                      disabled={details[idx].kg && details[idx].reps ?false:true}
                      onChange={(e) => this.handleCheck(e, idx)}
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}

            <div className="add-sets-table">
              <Button basic color="blue" onClick={(e) => this.increaseSets(e)}>
                Add Sets
              </Button>
            </div>
          </Table.Body>
        </Table>
      </div>
    );
  }
}
