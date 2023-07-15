// ApiURL variable with API string
const apiURL = "http://localhost:5000";

// api class for calling various api.
class todoapi {
  // calling api method for signup/register user.
  addUser(name, userName, password) {
    //sending data to backend api logic.
    return (
      fetch(`${apiURL}/addUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, userName, password }),
      })
        // Getting response and validating it.
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error while adding user data.");
          }

          // Sending response to the signup page.
          return response.json();
        })
        .catch((error) => {
          console.error("Error adding user:", error);
          throw error;
        })
    );
  }

  // calling api method for validating login user.
  user_Login(email, password) {
    //sending data to backend api logic.
    return (
      fetch(`${apiURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        // Getting response and validating it.
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error while login");
          }

          // Sending response to the signup page.
          return response.json();
        })
        .catch((error) => {
          console.error("Error login user:", error);
          throw error;
        })
    );
  }

  // Calling api method for create todo for perticular user.
  create_Todo(title, des, ddate, st, userID) {
    //sending data to backend api logic.
    return (
      fetch(`${apiURL}/createTodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, ddate, des, st, userID }),
      })
        // Getting response and validating it.
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error while creating task");
          }

          // Sending response to the signup page.
          return response.json();
        })
        .catch((error) => {
          console.error("Error creating task:", error);
          throw error;
        })
    );
  }

  // Calling api method for getting todo for perticular user.
  getTask(userID) {
    //sending and getting data to backend api logic.
    return (
      fetch(`${apiURL}/gettodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID }),
      })
        // Getting response and validating it.
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error while getting task");
          }

          // Sending response to the signup page.
          return response.json();
        })

        .catch((error) => {
          console.error("Error fetching task:", error);
          throw error;
        })
    );
  }

  // Calling api method for deleting todo for perticular user.
  delete_task(taskId, userID) {
    //sending and calling data to backend api logic.
    return (
      fetch(`${apiURL}/deletetodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId, userID }),
      })
        // Getting response and validating it.
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error while delete task");
          }

          // Sending response to the signup page.
          return response.json();
        })

        .catch((error) => {
          console.error("Error delete task:", error);
          throw error;
        })
    );
  }

  // Calling api method for updating todo for perticular user.
  updateTask(taskId, title, des, ddate, st, userID) {
    //sending and calling data to backend api logic.
    return (
      fetch(`${apiURL}/updatetodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId, title, des, ddate, st, userID }),
      })
        // Getting response and validating it.
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error while update task");
          }

          // Sending response to the signup page.
          return response.json();
        })

        .catch((error) => {
          console.error("Error update task:", error);
          throw error;
        })
    );
  }
}

export default todoapi;
