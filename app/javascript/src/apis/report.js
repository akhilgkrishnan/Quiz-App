import axios from "axios";

const list = () => axios.get(`/report`);
const generate = () => axios.get(`/report/generate_report`);

const reportApi = {
  list,
  generate
};

export default reportApi;
