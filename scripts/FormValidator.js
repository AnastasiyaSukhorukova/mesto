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
  _hideInputError(input, error) {
    input.classList.remove(this._errorClass);
    error.textContent = ' ';
    error.classList.remove(this._inputErrorClass);
  }

  // функция показа ошибки
  _showInputError(input, error, errorMessage) {
    input.classList.add(this._errorClass);
    error.textContent = errorMessage; // либо передать вторым аргументом ошибку
    error.classList.add(this._inputErrorClass);
  }

  // Если форма валидна, скрываем ошибку. Если нет, показываем
  _checkInputValid = (input) => {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`);
    console.log(errorElement);
    if (input.validity.valid) {
      this._hideInputError(input, errorElement);
    } else {
      this._showInputError(input, errorElement, input.validationMessage);
    }
  }

  // проверяет если хотя бы одно из полей не прошло валидацию 
  _hasInputValid() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
  })
  };

// функция которая меняет состояние кнопки
  _toogleButtonState = (inputList, button) => {
    if (this._hasInputValid(inputList)) {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = false;
    }
}

// проверяем валидность полей ввода
  _setEventListeners() {
// Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  this._toogleButtonState(this._inputList, this._buttonElement);
  this._inputList.forEach((input) => {
    input.addEventListener('input', () => {
      this._checkInputValid(input);
      this._toogleButtonState(this._inputList, this._buttonElement);
    });
  });
  }

// функция ответственная за включение валидации всех форм 
  enableValidation = () => {
    this._setEventListeners()
  }
}