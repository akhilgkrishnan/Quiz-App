import axios from "axios";

const list = () => axios.get(`/report`);

const reportApi = {
  list
};

export default reportApi;
