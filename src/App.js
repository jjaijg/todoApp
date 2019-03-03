import React from "react";
import { Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import TodosList from "./components/todos-list.component";
import CreateTodo from "./components/create-todo.component";
import Nav from "./components/navbar.component";
// function App() {
//   return <div>hai</div>;
// }

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <header>
            <Nav />
          </header>
          <main className="container">
            <Route path="/" exact component={TodosList} />
            <Route path="/create" component={CreateTodo} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
