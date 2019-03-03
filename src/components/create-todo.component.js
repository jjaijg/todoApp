import React, { Component } from "react";
import todoService from "../services/todo.service";

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      todo_description: "",
      todo_responsible: "",
      todo_completed: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let { name, value, type, checked } = e.target;
    type === "checkbox"
      ? this.setState({
          [name]: checked
        })
      : this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log(this.state);
    const { isEdit, ...newTodo } = this.state;
    // console.log("new:", newTodo);
    todoService.createTodoService(newTodo).then(res => console.log(res.data));

    this.setState({
      todo_description: "",
      todo_responsible: "",
      todo_completed: false
    });
  }

  render() {
    return (
      <div>
        <p>Add Todo</p>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="todo_description">Description : </label>
            <input
              type="text"
              className="form-control"
              name="todo_description"
              placeholder="Todo Description"
              value={this.state.todo_description}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="todo_responsible">Responsible : </label>
            <input
              type="text"
              className="form-control"
              name="todo_responsible"
              placeholder="Todo Responsible"
              value={this.state.todo_responsible}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Create Todo</button>
          </div>
        </form>
      </div>
    );
  }
}
