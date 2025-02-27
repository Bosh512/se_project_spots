// utils/Api.js

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards()]);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
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
