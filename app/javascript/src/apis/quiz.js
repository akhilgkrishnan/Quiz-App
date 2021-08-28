import axios from "axios";

const list = () => axios.get("/quiz", { withCredentials: true });
const create = payload => axios.post("/quiz/", payload);

const quizApi = {
  list,
  create
};

export default quizApi;
