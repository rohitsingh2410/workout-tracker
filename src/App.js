import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Switch } from "react-router-dom";
import FeedPage from "./FeedPage";
import AddWorkoutPage from "./Pages/AddWorkoutPage";
import WorkoutListsPage from "./Pages/WorkoutListsPage";
import WorkoutsPage from "./Pages/WorkoutsPage";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/feed" component={FeedPage} />
        <Route exact path="/addworkout" component={AddWorkoutPage} />
        <Route exact path="/workoutlists" component={WorkoutListsPage} />
        <Route exact path="/workout" component={WorkoutsPage} />
      </Switch>
    </>
  );
}

export default App;
