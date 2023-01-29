import React from "react";
import { Header, Image ,Icon} from "semantic-ui-react";
import "../Styles/NoWorkoutRecord.css";

export default function NoWorkoutRecords({ props }) {
  return (
    <div>
      <div className="no-workout-sign">
        
        <Header size='tiny'>
        <Icon disabled name='exclamation circle' size='large' />
            No workout records found !!</Header>
      </div>
    </div>
  );
}
