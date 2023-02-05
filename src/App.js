import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Switch } from "react-router-dom";
import FeedPage from "./FeedPage";
import AddWorkoutPage from "./Pages/AddWorkoutPage";
import WorkoutListsPage from "./Pages/WorkoutListsPage";
import WorkoutsPage from "./Pages/WorkoutsPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
function App() {
  return (
    <>
      <Switch>
        <Route exact path="/feed" component={FeedPage} />
        <Route exact path="/addworkout" component={AddWorkoutPage} />
        <Route exact path="/workoutlists" component={WorkoutListsPage} />
        <Route exact path="/workout" component={WorkoutsPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </>
  );
}

export default App;
