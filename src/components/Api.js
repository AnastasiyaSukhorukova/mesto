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
    this.url = options.url;
    this.headers = options.headers;
  }

  // Получение карточки
  getInitialCards() {
    return fetch(`${this.url}/cards`, {headers: this.headers}) 
    .then(handleResponse);
  }

  // создание карточек
  createInitialCards(data) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers, 
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })  
    .then(handleResponse);
  }

  // удаление карточки
  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })  
    .then(handleResponse);
  }

  // получение данных о пользователе с сервера
  getInfoUser() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: this.headers, 
    })  
    .then(handleResponse);
  }

  // редактирование данных пользователя с сервера
  editInfoUser(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers, 
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })  
    .then(handleResponse);
  }

  // изменение аватара
  editAvatarUser(url) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers, 
      body: JSON.stringify({
        avatar: url
      })
    })  
    .then(handleResponse);
  }

  // Поставить лайк
  addLikeCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers, 
    })  
    .then(handleResponse);
  }

  // Убрать лайк
  deleteLikeCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers, 
    })  
    .then(handleResponse);
  }
  
}