import React, { Component } from 'react'
import { ApiCalls } from './ApiCalls';
import ImageComponent from './components/ImageComponent';
import Navigator from './components/Navigator';
import "./Styles/FeedPage.css";
import NoWorkoutRecords from './components/NoWorkoutRecords';
import PlanLayout from './components/PlanLayout';
import MainPageLineGraph from './components/MainPageLineGraph';


export default class FeedPage extends Component {

constructor(props) {
    super(props);
    this.state = {
        user:null
    }
}
  async componentDidMount() {
    let user= await ApiCalls.getuserInfo();
    console.log("user",user.data)
    this.setState({user: user.data});
  }

  render() {
    const {posts}=this.state;
    
    return (
      <div className="feedPage">
      <div className="container">
        
      </div>
      <Navigator user={this.state.user}/>
      <NoWorkoutRecords/>
      <PlanLayout/>
      <MainPageLineGraph/>
      </div>
    )
  }
}
