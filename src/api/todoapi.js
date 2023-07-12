import axios from "axios";

const apiURL = "http://localhost:5000";

class todoapi {
  getUsers() {
    return axios
      .get(apiURL)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error retrieving users:", error);
        throw error;
      });
  }

  addUser(name, userName, password) {
    return axios
      .post(`${apiURL}/addUser`, { name, userName, password })
      .then((response) => response)
      .catch((error) => {
        console.error("Error adding user:", error);
        throw error;
      });
  }

  user_Login(email, password) {
    return axios
      .post(`${apiURL}/login`, { email, password })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error validating user:", error);
        throw error;
      });
  }

  updateUser(userId, name, email) {
    const url = `${apiURL}/${userId}`;
    return axios
      .put(url, { name, email })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error updating user:", error);
        throw error;
      });
  }

  deleteUser(userId, email) {
    const url = `${apiURL}/${userId}`;
    return axios
      .post(url, { email })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error deleting user:", error);
        throw error;
      });
  }

  create_Todo(title, des, ddate, st, userID) {
    return axios
      .post(`${apiURL}/createTodo`, {
        title,
        ddate,
        des,
        st,
        userID,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error adding user:", error);
        throw error;
      });
  }

  getTask(userID) {
    console.log(userID);
    return axios
      .post(`${apiURL}/gettodo`, { userID })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error getting task:", error);
        throw error;
      });
  }

  delete_task(taskId, userID) {
    // console.log(userID);
    return axios
      .post(`${apiURL}/deletetodo`, { taskId, userID })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error getting task:", error);
        throw error;
      });
  }

  updateTask(taskId, title, des, ddate, st, userID) {
    return axios
      .put(`${apiURL}/updatetodo`, {
        taskId,
        title,
        des,
        ddate,
        st,
        userID,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error updating task:", error);
        throw error;
      });
  }
}

export default todoapi;
