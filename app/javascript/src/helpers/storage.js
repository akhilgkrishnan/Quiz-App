const setToLocalStorage = ({ isLoggedIn, email, userId, userName }) => {
  localStorage.setItem("isLoggedIn", isLoggedIn);
  localStorage.setItem("userName", userName);
  localStorage.setItem("authEmail", email);
  localStorage.setItem("authUserId", userId);
};

const getFromLocalStorage = key => {
  return localStorage.getItem(key);
};

export { setToLocalStorage, getFromLocalStorage };
