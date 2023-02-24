//описаны запросы к серверу
// options опишем в корневом файле нашего приложения
// 'https://mesto.nomoreparties.co/v1/cohort-60/cards'
// authorization: 'f1b678bd-8daa-4ddc-9a95-4730e9a93182'

const handleResponse = (res) => {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  // Получение карточки
  getInitialCards() {
    return fetch(`${this._url}/cards`, {headers: this._headers}) 
    .then(handleResponse);
  }

  // создание карточек
  createInitialCards(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers, 
      body: JSON.stringify({
        name: name,
        link: link
      })
    })  
    .then(handleResponse);
  }

  // удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })  
    .then(handleResponse);
  }

  // получение данных о пользователе с сервера
  getInfoUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers, 
    })  
    .then(handleResponse);
  }

  // редактирование данных пользователя 
  editInfoUser(name, about) {
     return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers, 
      body: JSON.stringify({
        name: name,
        about: about
      })
    })  
    .then(handleResponse);
  }

  // изменение аватара
  editAvatarUser(url) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers, 
      body: JSON.stringify({
        avatar: url
      })
    })  
    .then(handleResponse);
  }

  // Поставить лайк
  addLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers, 
    })  
    .then(handleResponse);
  }

  // Убрать лайк
  deleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers, 
    })  
    .then(handleResponse);
  }
  
}