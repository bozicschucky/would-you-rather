import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Home,
  QuestionDetails,
  LeaderBoards,
  Login,
  ProtectedRoute,
} from "./components";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/question-details">Question Details</Link>
            </li>
            <li>
              <Link to="/leader-boards">LeaderBoards</Link>
            </li>
          </ul>
        </nav>

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
