import axios from "axios";

const create = (quiz_id, payload) =>
  axios.post(`/quiz/${quiz_id}/questions`, payload);

const show = (quiz_id, id) => axios.get(`/quiz/${quiz_id}/questions/${id}`);

const update = (quiz_id, id, payload) =>
  axios.put(`/quiz/${quiz_id}/questions/${id}`, payload);

const destroy = (quiz_id, id) =>
  axios.delete(`/quiz/${quiz_id}/questions/${id}`);

const questionApi = {
  create,
  show,
  update,
  destroy
};

export default questionApi;
