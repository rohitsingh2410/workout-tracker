import React, { Component } from "react";
import { Icon, Label, Menu, Table, Button } from "semantic-ui-react";
import { ApiCalls } from "../ApiCalls";
import "../Styles/WorkoutInputTable.css";

export default class WorkoutInputTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repsToPerform: 0,
      setsToPerform: 0,
      workoutName: "",
      details: [],
      lastWorkoutLog:[]
    };
  }
  async componentDidMount() {
    await this.mountData()
  }
  async mountData() {
    const { workoutDetails } = this.props;
    console.log("workoutDetails", workoutDetails);
    let date = workoutDetails.date;
    // check if data is log is present for this data.
    // if yes, show that, if not show default.
    let currentContent = [];
    let previousLog = await ApiCalls.searchLog({
      date:date,
      workoutName:workoutDetails.name
    })
    console.log("previousLog",previousLog)
    var previousLogCount=0;
    if(previousLog.status){
      previousLog.data.data.forEach(elem=>{
        currentContent.push(elem); 
        previousLogCount++;
      })
    }
    if(previousLog.lastWorkoutLog){
      console.log("lastWorkoutLog",previousLog.lastWorkoutLog)
      this.setState({lastWorkoutLog: previousLog.lastWorkoutLog})
    }
    console.log("previousLogCount",previousLogCount)
    for (let i = 0; i < workoutDetails.sets-previousLogCount; i++) {
      currentContent.push({ reps: null, kg: null, done: false });
    }
    
    this.setState({
      repsToPerform: workoutDetails.reps,
      setsToPerform: workoutDetails.sets,
      workoutName: workoutDetails.name,
      details: currentContent,
    });
  }
 async componentDidUpdate(prevProps,prevState) {
    console.log("componentDidUpdate",this.props,prevProps);
    if(prevProps.workoutDetails.date !== this.props.workoutDetails.date){
      this.setState({
        repsToPerform: 0,
        setsToPerform: 0,
        workoutName: "",
        details: [],
        lastWorkoutLog:[]
      })
      await this.mountData()

    }
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
  async handleCheck(e, idx) {
    const { workoutDetails } = this.props;
    let date = workoutDetails.date;
    let details = this.state.details;
    details[idx].done = !details[idx].done;
    this.setState({
      details: details,
    });
    let detailsToSend = details.filter(function(detail) {
      return detail.done===true
    })
    console.log("check ",date,workoutDetails.name,detailsToSend)
    let tosend={
      date:date,workoutName:workoutDetails.name,log:detailsToSend
    }
    await ApiCalls.logData(tosend)
   
  }
  increaseSets(e) {
    e.preventDefault();
    let details = this.state.details;
    details.push({ reps: null, kg: null, done: false });
    this.setState({
      details: details,
    });
    console.log("added set");
  }
  render() {
    const { details ,lastWorkoutLog} = this.state;
    console.log("render",lastWorkoutLog)
    return (
      <div className="input-table">
        <Table unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Set</Table.HeaderCell>
              <Table.HeaderCell>Previous Lifted</Table.HeaderCell>
              <Table.HeaderCell>Lifted</Table.HeaderCell>
              <Table.HeaderCell>Kg</Table.HeaderCell>
              <Table.HeaderCell>Reps</Table.HeaderCell>
              <Table.HeaderCell>✅</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {details.map((elem, idx) => {
              console.log("idx",idx)
              return (
                <Table.Row>
                  <Table.Cell>{idx + 1}</Table.Cell>
                  <Table.Cell>
                    {lastWorkoutLog[idx]?lastWorkoutLog[idx].kg +" KG":"-"}*{lastWorkoutLog[idx]?lastWorkoutLog[idx].reps+" reps":"-"}
                  </Table.Cell>
                  <Table.Cell>
                    {details[idx].kg}*{details[idx].reps}
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      type="number"
                      placeholder="KG"
                      inputMode="decimal"
                      name="kg"
                      className="small-size-input"
                      value={details[idx].kg}
                      onChange={(e) => this.handleChange(e, idx)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      type="number"
                      inputMode="decimal"
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
