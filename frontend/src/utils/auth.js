export const BASE_URL = 'https://https://api.nxxtrx.nomoreparties.sbs';

export const registr = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  }).then((response) => {
    return response.json();
  }).then((res) => {
    return res;
  }).catch((err) => {console.log(err)})
}

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  }).then((response) => response.json())
  .then((data) => {
    localStorage.setItem('userId', data._id)
    return data
  }).catch((err) => console.log(err))
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    }
  }).then((res) => res.json())
    .catch((err) => console.log(err))
}
