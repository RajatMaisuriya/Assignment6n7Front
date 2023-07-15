import React, { Component } from "react";
import ApiService from "../api/todoapi";

// creating object for calling api methods.
const apiService = new ApiService();

//todo page class
class Todo extends Component {
  // constructor
  constructor(props) {
    super(props);

    // creating state variable
    this.state = {
      list: [],
      todoItems: [],
      title: "",
      des: "",
      ddate: "",
      status: "Pending",
      editTaskId: null,
    };
  }
  // changing state of variables.
  handleChange = (e) => {
    // getting value of status logic.
    if (e.target.name === "status") {
      this.setState({ status: e.target.value });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  // Calling login method on submitting.
  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.editTaskId) {
      this.createTodo(); // Update existing task
    } else {
      this.createTodo(); // Create new task
    }
  };

  // calling api for getting task data after successfull login of perticular user.
  componentDidMount() {
    if (localStorage.getItem("userID")) {
      this.getTask();
    } else {
      window.location.href = "/";
    }
  }

  // delete session and logout.
  logout() {
    localStorage.setItem("userID", "");
    window.location.href = "/";
  }

  // update state variables.
  updateTask(item) {
    this.setState({
      title: item.taskTitle,
      des: item.description,
      ddate: item.dueDate,
      status: item.status,
      editTaskId: item.TaskID,
    });
  }

  // calling delete api method
  deleteTask(taskId) {
    const userID = localStorage.getItem("userID");

    apiService.delete_task(taskId, userID).then((response) => {
      if (response.status) {
        this.getTask(); // Refresh the task list after deletion
      } else {
        //window.alert(response.message);
      }
    });
  }

  // calling get task api method
  getTask() {
    const userID = localStorage.getItem("userID"); // getting session value
    console.log(userID);
    apiService.getTask(userID).then((response) => {
      if (response) {
        const result = JSON.stringify(response);
        console.log(result);
        this.setState({ todoItems: response }); // getting value in to display on todo page.
      } else {
        this.setState({ todoItems: response });
      }
    });
  }

  // calling api for creating todo or updating todo.
  createTodo() {
    const userID = localStorage.getItem("userID");
    const st = this.state.status;
    const { title, des, ddate } = this.state;

    // Determine if it's an update or create request
    if (this.state.editTaskId) {
      // Update task
      const taskId = this.state.editTaskId;
      apiService
        .updateTask(taskId, title, des, ddate, st, userID)
        .then((response) => {
          if (response.status) {
            this.getTask();
            this.setState({
              editTaskId: null, // Reset the editTaskId after successful update
            });
          } else {
            window.alert(response.message);
          }
        });
    } else {
      // Create task
      apiService.create_Todo(title, des, ddate, st, userID).then((response) => {
        if (response.status) {
          this.getTask();
        } else {
          window.alert(response.message);
        }
      });
    }

    // Reset the form fields after submit/update.
    this.setState({
      title: "",
      des: "",
      ddate: "",
      status: "Pending",
    });
  }

  // todo design page.
  render() {
    const { todoItems, title, des, ddate, status, editTaskId } = this.state;
    return (
      <div>
        <div className="container">
          <button onClick={() => this.logout()}>Logout</button>
          <h1>Create TODO</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Description">Description</label>
              <input
                type="text"
                name="des"
                id="des"
                value={des}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="DueDate">Due date</label>
              <input
                type="date"
                name="ddate"
                id="ddate"
                value={ddate}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Status">Select Status</label>
              <select
                name="status"
                id="status"
                value={status}
                onChange={this.handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button type="submit" className="btn">
              {editTaskId ? "Update" : "Create"}
            </button>
          </form>
        </div>
        <div>
          <h1>Your Todo List</h1>
          {todoItems.length < 1 ? (
            <p>There is no Tasks.</p>
          ) : (
            <table border="1">
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Description</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {todoItems.map((item) => (
                  <tr key={item.TaskID}>
                    <td
                      style={{
                        textDecoration:
                          item.status === "Completed" ? "line-through" : "none",
                      }}
                    >
                      {item.taskTitle}
                    </td>
                    <td
                      style={{
                        textDecoration:
                          item.status === "Completed" ? "line-through" : "none",
                      }}
                    >
                      {item.description}
                    </td>
                    <td>{item.dueDate}</td>
                    <td>{item.status}</td>
                    <td>
                      <button onClick={() => this.deleteTask(item.TaskID)}>
                        Delete
                      </button>

                      <button onClick={() => this.updateTask(item)}>
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

export default Todo;
