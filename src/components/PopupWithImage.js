import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(selectorPopup) {
      super(selectorPopup);
      this._elementTitle = this._popupElement.querySelector('.popup-image__title');
      this._elementImage = this._popupElement.querySelector('.popup-image__img');
    }

    open(name, link) {
      this._elementImage.src = link;
      this._elementImage.alt = name;
      this._elementTitle.textContent = name;
      
      super.open();
    }
  }