import axios from "axios";

const login = payload =>
  axios.post("/sessions", payload, { withCredentials: true });

const logout = () => axios.delete("/sessions", { withCredentials: true });

const authApi = {
  login,
  logout
};

export default authApi;
