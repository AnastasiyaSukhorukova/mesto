// класс Card, который создаёт карточку с текстом и ссылкой на изображение

export class Card {
  // принимает в конструктор её данные и селектор её template-элемента, функцию по открытию картинки на весь экран;
  constructor(cardsData, templateSelector, openBidImg) {
    this._name = cardsData.name;
    this._link = cardsData.link;
    this._like = cardsData.like;
    this._templateSelector = templateSelector;
    this._openBidImg = openBidImg;
  }

  // содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
  _getTemplate() {
    const newCard = document
      .querySelector('#cards')
      .content
      .querySelector('.element')
      .cloneNode(true);

    return newCard;
  }

  // содержит один публичный метод, 
  // который возвращает полностью работоспособный и наполненный данными элемент карточки.
  generateCard() {
    this._newCard = this._getTemplate();

    this._titleImg = this._newCard.querySelector('.element__title'); // название картинки
    this._elementImg = this._newCard.querySelector('.element__image'); // ссылка на картинку
    this._setEventListeners();

    this._titleImg.textContent = this._name;
    this._elementImg.alt = this._name;
    this._elementImg.src = this._link;

    return this._newCard;
  }

  // функция удаления карточек
  _handleDeleteCards() {
    this._newCard.remove();
    this._newCard = null;
}

  // функция лайков, при нажатии на кликнутый элемент добавляется/убирается булевый модификатор 
  _handleLikeCard() {
    this._likeButton.classList.toggle('element__like_active');
}

  _setEventListeners() {
  // переменная и слушатель на кнопку удалить и лайк
    this._newCard.querySelector('.element__delete').addEventListener('click', () => {
    this._handleDeleteCards()
  })

  this._likeButton = this._newCard.querySelector('.element__like');
  this._likeButton.addEventListener('click', () => {
      this._handleLikeCard(this._like)
    })

  // открытие картинки на весь экран
  this._cardImage = this._newCard.querySelector('.element__image');
  this._cardImage.addEventListener('click', () => {
      this._openBidImg(this._name, this._link)
    });
  }
  };