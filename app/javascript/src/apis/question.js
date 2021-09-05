import axios from "axios";

const create = (quiz_id, payload) =>
  axios.post(`/quiz/${quiz_id}/questions`, payload);

const questionApi = {
  create
};

export default questionApi;
