import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(selectorPopup) {
      super(selectorPopup);
    }

    open(name, link) {
      this._elementTitle = this._popupElement.querySelector('.popup-image__title');
      this._elementImage = this._popupElement.querySelector('.popup-image__img');
      
      this._elementImage.src = link;
      this._elementImage.alt = name;
      this._elementTitle.textContent = name;
      
      super.open();
    }
  }