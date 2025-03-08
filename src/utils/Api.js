class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  _response(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._response);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._response);
  }

  postNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._response);
  }

  editUserInfo({ name, about, avatar }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
        avatar,
      }),
    }).then(this._response);
  }

  editAvatarInfo(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._response);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._response);
  }

  changeLikeStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._response);
  }

  //end of class
}

export default Api;

// link:
//  https://bosh512.github.io/se_project_spots

// token:
//  5fb31e3b-65c9-4a67-92d8-0d110ec5189d

//  baseUrl
// https://around-api.en.tripleten-services.com/v1

// API endpoints
// As a reference, we’ve included a list of all the API endpoints you’ll need to write requests for. We’ll explain them in more detail below.

// User routes

// GET /users/me – Get the current user’s info --
// PATCH /users/me – Update your profile information
// PATCH /users/me/avatar – Update avatar
// Card routes

// GET /cards – Get all cards --
// POST /cards – Create a card
// DELETE /cards/:cardId – Delete a card
// PUT /cards/:cardId/likes – Like a card
// DELETE /cards/:cardId/likes – Dislike a card
