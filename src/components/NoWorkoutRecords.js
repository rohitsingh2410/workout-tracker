import React from "react";
import { Header, Image ,Icon} from "semantic-ui-react";
import "../Styles/NoWorkoutRecord.css";
const Quote = require('inspirational-quotes');

export default function NoWorkoutRecords({ props }) {
  return (
    <div>
      <div className="no-workout-sign">
        
        <Header size='tiny'>
        <Icon disabled name='bullhorn' size='large' />
            {Quote.getRandomQuote()}</Header>
      </div>
    </div>
  );
}
