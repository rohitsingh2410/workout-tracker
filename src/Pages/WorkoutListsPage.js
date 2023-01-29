import React, { Component } from "react";
import { Icon, Label, Menu, Table, Button } from "semantic-ui-react";
import HeaderComponent from "../components/HeaderComponent";

export default class WorkoutListsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}
  render() {
    return (
      <div className="workout-list-table">
        <HeaderComponent
          iconName="sitemap"
          headerMainContent="Available workouts"
          subheader="List of your all available workout splits"
        />
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
            {/* {dailyLog[this.props.idx].workouts.map((elem) => {
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
              })} */}
            <Table.Row>
              <Table.Cell>PPL</Table.Cell>
              <Table.Cell>6 days workout</Table.Cell>
              <Table.Cell>
                <Icon name="edit outline" color="grey" size="large" />
              </Table.Cell>
              <Table.Cell>
                <Icon name="delete" color="red" size="large" />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell> Upper Lower</Table.Cell>
              <Table.Cell>4 days workout</Table.Cell>
              <Table.Cell>
                <Icon name="edit outline" color="grey" size="large" />
              </Table.Cell>
              <Table.Cell>
                <Icon name="delete" color="red" size="large" />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}
