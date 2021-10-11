import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Counter } from "./components/counter";

function App() {
  return (
    <Router>
      <div className="App">
        <Counter />
      </div>
    </Router>
  );
}

export default App;
