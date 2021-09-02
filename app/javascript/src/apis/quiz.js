import axios from "axios";

const list = () => axios.get("/quiz", { withCredentials: true });
const create = payload => axios.post("/quiz/", payload);
const show = id => axios.get(`/quiz/${id}`);
const update = (id, payload) => axios.put(`/quiz/${id}`, payload);

const quizApi = {
  list,
  create,
  show,
  update
};

export default quizApi;
