// класс Popup, который отвечает за открытие и закрытие попапа. 

export default class Popup {
  constructor(selectorPopup) {
    this._popupElement = document.querySelector(selectorPopup);
    this._popupButtonClass = this._popupElement.querySelector('.popup__close');
  }

  open() {
    this._popupElement.classList.add('popup-opened');
    console.log(this._popupElement);
    document.addEventListener('keydown', this._handleEscClose());
  }

  close() {
    this._popupElement.classList.remove('popup-opened');
    document.removeEventListener('keydown', this._handleEscClose());
  }

  // приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
     //const popupOpened = document.querySelector(this._selectorPopup); // не закрывается при клике на Esc
      this.close();
    }
  }

  //Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. 
  //Модальное окно также закрывается при клике на затемнённую область вокруг формы.

  setEventListeners() {
    //buttonCloseList.forEach(btn => {
     // const popup = btn.closest('.popup');
      this._popupElement.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')) {
          this.close();
        }
      });
      this._popupButtonClass.addEventListener('click', () => this.close()); 
  };
}
