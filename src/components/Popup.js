// класс Popup, который отвечает за открытие и закрытие попапа. 

export default class Popup {
  constructor(selectorPopup) {
    this._popupElement = document.querySelector(selectorPopup);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClick = (evt) => {
    if (!evt.target.closest('.popup__container')) {
      this.close();
    }
  }

  //Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. 
  //Модальное окно также закрывается при клике на затемнённую область вокруг формы.

  setEventListeners() {
    this._popupElement.addEventListener('click', this._handleOverlayClick);
  };
}

