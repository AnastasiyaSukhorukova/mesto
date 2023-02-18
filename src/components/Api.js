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

  getInitialCards() {
    return fetch(this.url, {headers: this.headers}) // обязатель return
    .then(handleResponse);
  }

  createInitialCards(data) {
    return fetch(this.url, {
      method: 'POST',
      headers: this.headers, 
      body: JSON.stringify(data)
    })  
    .then(handleResponse);
  }

  // редактирование профиля
  updateCards(data) {
    return fetch(this.url, {
      method: 'PATCH',
      headers: this.headers, 
      body: JSON.stringify(data)
    })  
    .then(handleResponse);
  }

  // удаление карточки
  deleteCard(data) {
    return fetch(this.url, {
      method: 'DELETE',
      headers: this.headers, 
      body: JSON.stringify(data)
    })  
    .then(handleResponse);
  }

  // другие методы работы с API
}