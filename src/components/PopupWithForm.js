import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
  constructor(selectorPopup, handleButtonClick) {
    super(selectorPopup);

    this._handleButtonClick = handleButtonClick; // принимает в конструктор колбэк сабмита формы.
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputList = this._popupElement.querySelectorAll('.popup__input'); // все элементы полей
  }

  // собирает данные всех полей формы
  _getInputValues() {
    // создаём пустой объект
  this._formValues = {};

  // добавляем в этот объект значения всех полей
  this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });

  // возвращаем объект значений
  return this._formValues;
  }

  // при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._form.reset();
  }

  // должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
    evt.preventDefault();

      // добавим вызов функции _handleButtonClick
      // передадим ей объект — результат работы _getInputValues
     this._handleButtonClick(this._getInputValues());
  
     this.close();
    });
  }
}