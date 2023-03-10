import React, { Component } from "react";
import { Icon, Modal, Loader, Table, Button, Confirm } from "semantic-ui-react";
import HeaderComponent from "../components/HeaderComponent";
import { ApiCalls } from "../ApiCalls";

export default class WorkoutListsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageReady: false,
      deleteConfirm: false,
      awatingConfirmID: null,
      workoutLists: [],
      showShareModal: false,
      email: null,
    };
  }
  async componentDidMount() {
    let list = await ApiCalls.fetchMyWorkout();
    console.log("list", list);
    this.setState({
      workoutLists: list.data,
      pageReady: true,
    });
  }
  async action(id, action) {
    console.log(id, action);
    const { deleteConfirm, workoutLists } = this.state;
    switch (action) {
      case "open":
        window.location = `/workout/?id=${id}`;
        break;
      case "edit":
        window.location = `/editworkout/?id=${id}`;
        break;
      case "share":
        this.setState({
          showShareModal: true,
        });
        break;

      case "delete":
        if (deleteConfirm) {
          let status = await ApiCalls.deleteWorkout(id);
          if (status.status) {
            window.location.reload();
          }
        } else {
          this.setState({
            deleteConfirm: true,
            awatingConfirmID: id,
          });
        }

        break;

      case "no-workout-action":
        window.location = id;
        break;
      default:
        break;
    }
  }
  closeDeleteModal(e) {
    e.preventDefault();
    this.setState({
      deleteConfirm: false,
      awatingConfirmID: null,
    });
  }
  closeModal() {
    this.setState({
      showShareModal: false,
    });
  }
  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }
  sharePlan(e) {
    e.preventDefault();
    // hit api
    this.setState({
      email: null,
    });
  }
  render() {
    const {
      workoutLists,
      deleteConfirm,
      awatingConfirmID,
      pageReady,
      showShareModal,
    } = this.state;
    if (!pageReady) {
      <div className="workout-list-table">
        <HeaderComponent
          iconName="sitemap"
          headerMainContent="Available workouts"
          subheader="List of your all available workout splits"
        />
        <Loader active inline="centered" />
      </div>;
    } else {
      return (
        <div className="workout-list-table">
          <HeaderComponent
            iconName="sitemap"
            headerMainContent="Available workouts"
            subheader="List of your all available workout splits"
          />
          <Modal
            size={"tiny"}
            open={showShareModal}
            onClose={(e) => this.closeModal(e)}
          >
            <Modal.Header>Share your workout plan</Modal.Header>
            <Modal.Content>
              <div>
                <input
                  placeholder="enter user email"
                  type="email"
                  onChange={(e) => this.handleEmailChange(e)}
                />
              </div>
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={(e) => this.closeModal(e)}>
                Close
              </Button>
              <Button positive onClick={(e) => this.sharePlan(e)}>
                Share
              </Button>
            </Modal.Actions>
          </Modal>
          {workoutLists.length > 0 ? (
            <Table unstackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Workout</Table.HeaderCell>
                  {/* <Table.HeaderCell>Notes</Table.HeaderCell> */}
                  <Table.HeaderCell>Edit</Table.HeaderCell>
                  <Table.HeaderCell>Share</Table.HeaderCell>
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
                      {/* <Table.Cell onClick={(e) => this.action(elem.id, "open")}>
                        {elem.Description}
                      </Table.Cell> */}
                      <Table.Cell>
                        <Icon
                          name="edit outline"
                          color="blue"
                          size="large"
                          onClick={(e) => this.action(elem.id, "edit")}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Icon
                          name="share square outline"
                          color="blue"
                          size="large"
                          onClick={(e) => this.action(elem.id, "share")}
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
                {console.log("deleteConfirm", deleteConfirm)}
                <Confirm
                  open={deleteConfirm}
                  onCancel={(e) => this.closeDeleteModal(e)}
                  onConfirm={(e) => this.action(awatingConfirmID, "delete")}
                />
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
              <Button
                color="blue"
                onClick={(e) => this.action("/addworkout", "no-workout-action")}
              >
                Click here to Add Plan
              </Button>
            </div>
          )}
        </div>
      );
    }
  }
}
