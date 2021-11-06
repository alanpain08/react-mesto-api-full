export const BASE_URL = "https://allmestos.backend.nomoredomains.rocks";

const checkServerAnswer = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Что-то пошло не так: ${res.status}`);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkServerAnswer(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  }).then((res) => checkServerAnswer(res));
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
  }).then((res) => checkServerAnswer(res));
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "POST",
    credentials: 'include',
  }).then((res) => checkServerAnswer(res));
};




