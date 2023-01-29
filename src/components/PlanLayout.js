import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import addWorkout from "../assets/addWorkout.gif";
import starWorkout from "../assets/StartWorkout.gif";
import trackCardio from "../assets/trackCardio.gif";
import "../Styles/plans.css";
import { useHistory } from 'react-router-dom';



export default function PlanLayout() {
  const history = useHistory();
  
  const routeChange = (e) =>{ 
    let path = `newPath`; 
    // history.push(e);
    window.location = e;

  }

  return (
    <div>
      <h3>My Plans</h3>

      <div className="plans">
      
      <img alt="img" src={addWorkout} onClick={(e)=>routeChange("/addworkout")}/>
      <img alt="img" src={starWorkout} onClick={(e)=>routeChange("/workoutlists")} />
      <img alt="img" src={trackCardio} />
     
      </div>
    </div>
  );
}
