import axios from "axios";

const list = () => axios.get("/quiz", { withCredentials: true });

const quizApi = {
  list
};

export default quizApi;
