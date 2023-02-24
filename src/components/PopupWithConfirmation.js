import Popup from './Popup.js'

// подтверждение 
export default class PopupWithConfirmation extends Popup{
  constructor(selectorPopup, handleDeleteCard) {
    super(selectorPopup);
    this._handleDeleteCard = handleDeleteCard;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._buttonSave = this._popupElement.querySelector('.popup__save');
  }

  open(id, card) {
    super.open()
    this._id = id;
    this._cardElement = card;
  }

  setEventListeners() {
    this._formElement.addEventListener('click', () => {
      this._handleDeleteCard(this._id, this._cardElement)
    });
    super.setEventListeners();
  }

  // удаление карточки
  deleteCard() {
    this._cardElement.remove();
  }

  
}