import React, { Component } from "react";

import Todo from "../components/todo.component";
import todoService from "../services/todo.service";

export default class TodosList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      todos: [],
      todocomponents: []
    };
    this.toggle = this.toggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggle(editTodo) {
    console.log("in toggle: ", editTodo);

    !this.state.modal
      ? this.setState({
          editTodo: editTodo,
          modal: !this.state.modal
        })
      : this.setState({
          modal: !this.state.modal
        });
  }

  componentDidMount() {
    todoService
      .getTodos()
      .then(res => {
        // console.log(res.data);
        // console.log(res.status);
        this.setState(
          {
            todos: [...res.data]
          },
          () => {
            this.setState({
              todocomponents: [...this.todoList()]
            });
          }
        );
      })
      .catch(error => {
        // Error
        console.log(error);
      });
    // console.log("state:", this.state.todocomponents);
  }

  todoList() {
    return this.state.todos.map((currentTodo, i) => {
      // console.log(currentTodo);
      return (
        <Todo
          todo={currentTodo}
          key={i}
          handleDelete={this.handleDelete}
          handleChange={this.handleChange}
          modal={this.state.modal}
        />
      );
    });
    // console.log("todocomponents:", todoComponents);
    // return todoComponents;
  }

  handleDelete(id, e) {
    // console.log(id);
    let todos = this.state.todos;
    todos = todos.filter(todo => todo._id !== id);
    todoService
      .deleteTodo(id)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    // console.log("todos: ", todos);
    this.setState(
      {
        todos: todos
      },
      () => {
        // console.log(this.state.todos);
        this.setState({
          todocomponents: this.todoList()
        });
      }
    );
  }
  componentDidUpdate() {
    console.log("updated");
  }
  render() {
    return (
      <div>
        <h3>Todo List</h3>

        <table className="table table-dark">
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.todocomponents.length !== 0 ? (
              this.state.todocomponents
            ) : (
              <tr>
                <td>Nothing to so</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
