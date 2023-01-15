/*
Создайте класс FormValidator, который настраивает валидацию полей формы:
принимает в конструктор объект настроек с селекторами и классами формы;
принимает вторым параметром элемент той формы, которая валидируется;
имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
имеет публичный метод enableValidation, который включает валидацию формы.
Для каждой проверяемой формы создайте экземпляр класса FormValidator.
*/

export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._errorClass = config.errorClass;
    this._inputErrorClass = config.inputErrorClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._formSelector = config.formSelector;
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  // функция скрытия ошибки 
  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.remove(this._errorClass);
    errorElement.textContent = ' ';
    errorElement.classList.remove(this._inputErrorClass);
  }

  // функция показа ошибки
  _showInputError(input) {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.add(this._errorClass);
    errorElement.textContent = this._validationMessage; // либо передать вторым аргументом ошибку
    errorElement.classList.add(this._inputErrorClass);
  }

  // Если форма валидна, скрываем ошибку. Если нет, показываем
  _checkInputValid = (input) => {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  // проверяет если хотя бы одно из полей не прошло валидацию - НЕ ИСПРАВЛЯЛА ДАЛЬШЕ
  _hasInputValid(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
  })
  };

  // активное состояние кнопки
  _enableSubmitButton() {
    if (this._hasInputValid(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
  }

// неактивное состояние кнопки
  _disableSubmitButton() {
    if (!this._hasInputValid(this._inputList)) {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

// функция которая меняет состояние кнопки
  _toogleButtonState = () => {
    this._enableSubmitButton();
    this._disableSubmitButton();
}

// проверяем валидность полей ввода
  _setEventListeners() {
// Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  this._toogleButtonState();
  this._inputList.forEach((input) => {
    input.addEventListener('input', () => {
      this._checkInputValid(input);
      this._toogleButtonState();
    });
  });
  }

// функция ответственная за включение валидации всех форм 
  enableValidation = () => {
    this._setEventListeners()
  }
}