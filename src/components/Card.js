// класс Card, который создаёт карточку с текстом и ссылкой на изображение

export default class Card {
  // принимает в конструктор её данные и селектор её template-элемента, функцию по открытию картинки на весь экран;
  constructor(cardsData, userId, templateSelector, {handleCardClick, handleLikeClick, handleDeleteCards}) {
    this._name = cardsData.name;
    this._link = cardsData.link;
    this._likes = cardsData.likes;
    this._userId = userId; // текущий id (мой)
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteCards = handleDeleteCards;
    this._ownerId = cardsData.owner._id; // выясняем id пользователя
    this._cardId = cardsData._id;
    this._newCard = this._getTemplate();
  }

  // возвращаем ID карточки
  getCardId() {
    return this._cardId;
  }

  // содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
  _getTemplate() {
    const newCard = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return newCard;
  }

  // содержит один публичный метод, 
  // который возвращает полностью работоспособный и наполненный данными элемент карточки.
  generateCard() {
    this._newCard = this._getTemplate();
    // нашли элементы раньше, до вызова this._setEventListeners() что не повторять их поиск при установке слушателя
    this._titleImg = this._newCard.querySelector('.element__title'); // название картинки
    this._elementImg = this._newCard.querySelector('.element__image'); // ссылка на картинку
    this._btnDeleteCard = this._newCard.querySelector('.element__delete'); // кнопка удаления карточки 
    this._likeButton = this._newCard.querySelector('.element__like'); 
    this._likeAmount = this._newCard.querySelector('.element__like-number');

    this._setEventListeners(); 

    this._titleImg.textContent = this._name;
    this._elementImg.alt = this._name;
    this._elementImg.src = this._link;
  
    this._likeAmount.textContent = this._likes.length;

    // если карточка создана не мной то скрыть элемент корзины
    if (this._ownerId !== this._userId) {
      this._btnDeleteCard.style.display = 'none'
    }

    this.addLikeCardUser(this._likes);

    return this._newCard;
  }

  // проверяем лайки пользователя
  checkLikesUser() {
      return this._likes.some((like) => { // возвращает true/false
      return like._id === this._userId; // проверка id
    })
  }

  // закрашивание и удаление закрашивания лайка
  checklikeCard() {
    //console.log(this.checkLikesUser())
    if(this.checkLikesUser(true)){
      this._likeButton.classList.add('element__like_active')
    } else {
      this._likeButton.classList.remove('element__like_active')
    }
  }

  // поставить лайк
  addLikeCardUser(likes) {
    this._likes = likes;
    this._likeAmount.textContent = this._likes.length;
    this.checklikeCard();
  }

  _setEventListeners() {
  // переменная и слушатель на кнопку удалить (на подтверждение) и лайк
  this._btnDeleteCard.addEventListener('click', () => {
    this._handleDeleteCards()
  })

  this._likeButton.addEventListener('click', () => {
    this._handleLikeClick(this._cardId);
    })

  // открытие картинки на весь экран
  this._elementImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });

  // открытие попапа для подтверждения удаления карточки 
  this._btnDeleteCard.addEventListener('click', () => {
    this._handleDeleteCards(this._cardId, this._newCard)
  })
  }
  };