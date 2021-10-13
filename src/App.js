import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Home,
  QuestionDetails,
  LeaderBoards,
  Login,
  ProtectedRoute,
  LogOut,
  NavBar,
} from "./components";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <ProtectedRoute
            exact
            path="/leader-boards"
            component={LeaderBoards}
          />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/question-details"
            component={QuestionDetails}
          />
          <ProtectedRoute exact path="/logout" component={LogOut} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
