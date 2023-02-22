import React, { useEffect, useState } from "react";
import "./App.css";
import { Link, Route, Switch ,BrowserRouter} from "react-router-dom";
import FeedPage from "./FeedPage";
import AddWorkoutPage from "./Pages/AddWorkoutPage";
import WorkoutListsPage from "./Pages/WorkoutListsPage";
import WorkoutsPage from "./Pages/WorkoutsPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import BottomNavBar from "./components/BottomNavBar";
import Stats from "./Pages/Stats";
import Community from "./Pages/Community";
import Settings from "./Pages/Settings";
import PageNotFound from "./Pages/PageNotFound";
function App() {
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/feed" component={FeedPage} />
        <Route exact path="/addworkout" component={AddWorkoutPage} />
        <Route exact path="/workoutlists" component={WorkoutListsPage} />
        <Route exact path="/workout" component={WorkoutsPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/stats" component={Stats} />
        <Route exact path="/community" component={Community} />
        <Route exact path="/settings" component={Settings} />
        <Route path="*" element={PageNotFound} />
      </Switch>
      <BottomNavBar/>
    </BrowserRouter>
  );
}

export default App;
