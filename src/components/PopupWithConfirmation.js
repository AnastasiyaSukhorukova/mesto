import Popup from './Popup.js'

// подтверждение 
export default class PopupWithConfirmation extends Popup{
  constructor(selectorPopup, handleDeleteCard) {
    super(selectorPopup);
    this._handleDeleteCard = handleDeleteCard;
    this._formElement = this._popupElement.querySelector('.popup__form')
  }

  open() {
    super.open()
    this._id = id;
    this._cardElement = card;
  }

  setEventListeners() {

  }

  
}