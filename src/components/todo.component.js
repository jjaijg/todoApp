import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckCircle,
  faTrashAlt
} from "@fortawesome/free-regular-svg-icons";

import todoService from "../services/todo.service";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateCounter: 0,
      isDisabled: true,
      ...props
    };
    this.Disabled = "Disabled";
    const todo= this.state.todo;
    if (todo.todo_completed) {
      this.todoClass = " text-success";
    } else {
      this.todoClass = " text-warning";
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDobuleClick = this.handleDobuleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const todo = this.state.todo;
    const counter = this.state.updateCounter + 1;
    todo.todo_completed = !this.state.todo.todo_completed;

    if (todo.todo_completed) {
      this.todoClass = " text-success";
    } else {
      this.todoClass = " text-warning";
    }

    this.setState({
      updateCounter: counter,
      todo: todo
    });
  }

  handleDobuleClick(e) {
    this.Disabled = "";
    this.state.isDisabled
      ? (this.Disabled = "")
      : (this.Disabled += " Disabled");
    this.setState({
      isDisabled: !this.state.isDisabled
    });
  }

  updateTodo(id, todo) {
    todoService
      .updateTodoService(id, todo)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  handleChange(e) {
    let { name, value, type, checked } = e.target;
    let todo = this.state.todo;
    const counter = this.state.updateCounter + 1;
    type === "checkbox" ? (todo[name] = checked) : (todo[name] = value);
    this.setState({
      updateCounter: counter,
      todo: todo
    });
    console.log("todo  : ", this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("prev : ", prevState);
    console.log("state :", this.state);
    if (this.state !== prevState) {
      const todo = this.state.todo;
      this.updateTodo(todo._id, todo);
    }
  }

  render() {
    return (
      <tr>
        <td onDoubleClick={this.handleDobuleClick}>
          <input
            type="text"
            className={"form-control " + this.Disabled}
            name="todo_description"
            placeholder="Todo Description"
            value={this.state.todo.todo_description}
            disabled={this.state.isDisabled}
            onChange={this.handleChange}
          />
        </td>
        <td onDoubleClick={this.handleDobuleClick}>
          <input
            type="text"
            className={"form-control " + this.Disabled}
            name="todo_responsible"
            placeholder="Todo Responsible"
            value={this.state.todo.todo_responsible}
            disabled={this.state.isDisabled}
            onChange={this.handleChange}
          />
        </td>
        <td className={this.todoClass}>
          {this.state.todo.todo_completed ? "completed" : "Progress"}
        </td>
        <td>
          <FontAwesomeIcon
            onClick={this.handleClick}
            icon={
              this.state.todo.todo_completed ? faTimesCircle : faCheckCircle
            }
            color={this.state.todo.todo_completed ? "red" : "lightGreen"}
          />
          <FontAwesomeIcon
            onClick={e => {
              this.props.handleDelete(this.props.todo._id, e);
            }}
            icon={faTrashAlt}
            color="red"
          />
        </td>
      </tr>
    );
  }
}
