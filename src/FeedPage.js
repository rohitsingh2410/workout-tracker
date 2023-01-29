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
        posts:[]
    }
}
  async componentDidMount() {
    // let posts = await ApiCalls.getPosts();
    // posts=posts.slice(0,100)
    // this.setState({posts: posts});
    // console.log("posts",posts);

  }

  render() {
    const {posts}=this.state;
    
    return (
      <div className="feedPage">
      <div className="container">
        
      </div>
      <Navigator/>
      <NoWorkoutRecords/>
      <PlanLayout/>
      <MainPageLineGraph/>
      </div>
    )
  }
}
