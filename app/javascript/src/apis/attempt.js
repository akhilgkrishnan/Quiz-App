import axios from "axios";

const show = slug => axios.get(`/attempt/${slug}/show-quiz`);
const login = (slug, payload) => axios.post(`/attempt/${slug}/login`, payload);

const attemptApi = {
  show,
  login
};

export default attemptApi;
