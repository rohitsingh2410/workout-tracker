import React, { Component } from "react";
import { Icon, Label, Menu, Table, Button } from "semantic-ui-react";
import HeaderComponent from "../components/HeaderComponent";
import { ApiCalls } from "../ApiCalls";

export default class WorkoutListsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutLists: [],
    };
  }
  async componentDidMount() {
    let list = await ApiCalls.fetchMyWorkout();
    console.log("list", list);
    this.setState({
      workoutLists: list.data,
    });
  }
  action(id, action) {
    console.log(id, action);
    switch (action) {
      case "open":
        window.location = `/workout/?id=${id}`;
        break;
      case "edit":
        break;

      case "delete":
        break;

      case "no-workout-action":
        window.location = id;
      break;
      default:
        break;
    }
  }
  render() {
    const { workoutLists } = this.state;
    return (
      <div className="workout-list-table">
        <HeaderComponent
          iconName="sitemap"
          headerMainContent="Available workouts"
          subheader="List of your all available workout splits"
        />
        {workoutLists.length > 0 ? (
          <Table unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Workout</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
                <Table.HeaderCell>Remove</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {workoutLists.map((elem, idx) => {
                return (
                  <Table.Row key={elem.id}>
                    <Table.Cell onClick={(e) => this.action(elem.id, "open")}>
                      {elem.SplitName}
                    </Table.Cell>
                    <Table.Cell onClick={(e) => this.action(elem.id, "open")}>
                      {elem.Description}
                    </Table.Cell>
                    <Table.Cell>
                      <Icon
                        name="edit outline"
                        color="grey"
                        size="large"
                        onClick={(e) => this.action(elem.id, "edit")}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Icon
                        name="delete"
                        color="red"
                        size="large"
                        onClick={(e) => this.action(elem.id, "delete")}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        ) : (
          <div
            className="no-plan"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "15%",
            }}
          >
            <h2>No workout plan added </h2>
            <Button color="blue"
            onClick={(e)=>this.action("/addworkout","no-workout-action")}
            >Click here to Add Plan</Button>
          </div>
        )}
      </div>
    );
  }
}
