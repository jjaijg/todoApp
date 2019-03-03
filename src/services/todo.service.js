import axios from "axios";

//const url = "https://1022jrkqvl.sse.codesandbox.io/todos/";
const url = "https://todobe.herokuapp.com/todos/";

export default {
  //get todos
  getTodos: async () => {
    return await axios.get(url);
  },
  // create todo
  createTodoService: async todo => {
    return await axios.post(`${url}add`, todo);
  },
  // update todo
  updateTodoService: async (id, todo) => {
    return await axios.post(`${url}update/${id}`, todo);
  },
  // delete todo
  deleteTodo: async id => {
    return await axios.delete(url + id);
  }
};
