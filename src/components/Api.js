//описаны запросы к серверу

export default class Api {
  constructor(options) {
    // тело конструктора
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-60/cards', {
      headers: {
        authorization: 'f1b678bd-8daa-4ddc-9a95-4730e9a93182'
      }
    })
    .then(res => res.ok ? res.json(): Promise.reject(`Ошибка: ${res.status}`))
    .catch(console.log);
  }

  // другие методы работы с API
}