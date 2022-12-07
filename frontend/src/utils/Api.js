class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers
  }

  _check(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._check(res))
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._check(res))
  }

  setUserInfo(values) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: values.name,
        about: values.about,
        avatar: values.avatar
      })
    })
    .then(res => this._check(res))
  }

  setUserAvatar(value) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: value})
    })
    .then(res => this._check(res))
  }

  postNewCard(values) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: values.place,
        link: values.link
      })
    })
    .then(res => this._check(res))
  }

  deleteOwnersCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => this._check(res))
    }

  changeLikeCardStatus(cardId, newState) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: (`${newState ? ('PUT') : ('DELETE')}`),
      headers: this._headers,
     })
    .then(res => this._check(res))
  }

  componentDidMount() {
    this.setUserInfo(this.getProfileInfo());
  }

  setHeaders(token) {
    this._headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
}

const myApi = new Api({
  baseUrl: 'https://api.mestogram.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  }
});

export default myApi;