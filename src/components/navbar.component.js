import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a
          href="https://987y7nznyp.codesandbox.io/"
          target="_blank"
          className="navbar-brand"
        >
          <span role="img" aria-label="nav-brand">
            📖
          </span>
        </a>
        <Link to="/" className="navbar-brand">
          Todo App
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Todos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create" className="nav-link">
                Create Todo
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
