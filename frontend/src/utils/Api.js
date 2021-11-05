import { apiConfig } from "./constants";

class Api {
  constructor({ adress, headers }) {
    this._adress = adress;
    this._headers = headers;
  }

  _checkServerAnswer(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._adress}/users/me`, {
      method: "GET",
      credentials: 'include',
    }).then((res) => this._checkServerAnswer(res));
  }

  getInitialCards() {
    return fetch(`${this._adress}/cards`, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._checkServerAnswer(res));
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._adress}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._checkServerAnswer(res));
  }

  addCard({ name, link }) {
    return fetch(`${this._adress}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._checkServerAnswer(res));
  }

  putLike(cardId) {
    return fetch(`${this._adress}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._checkServerAnswer(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._adress}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._checkServerAnswer(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._adress}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._checkServerAnswer(res));
  }

  editAvatar({ avatar }) {
    return fetch(`${this._adress}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._checkServerAnswer(res));
  }
}

export const api = new Api(apiConfig);
