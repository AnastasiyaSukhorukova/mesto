/*
Создайте класс FormValidator, который настраивает валидацию полей формы:
принимает в конструктор объект настроек с селекторами и классами формы;
принимает вторым параметром элемент той формы, которая валидируется;
имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
имеет публичный метод enableValidation, который включает валидацию формы.
Для каждой проверяемой формы создайте экземпляр класса FormValidator.
*/

export class FormValidator {
  constructor(config, formElement, inputElement) {
    this._config = config;
    this._formElement = formElement;
    this._errorClass = config.errorClass;
    this._inputErrorClass = config.inputErrorClass;
    this._inputElement = inputElement;
    this._validationMessage = inputElement.validationMessage;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._formSelector = config.formSelector;
  }

  // функция скрытия ошибки
  _hideInputError() {
    const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = ' ';
    inputElement.classList.remove(this._inputErrorClass);
  }

  // функция показа ошибки
  _showInputError() {
    const errorElement = formElement.querySelector(`.${this._inputElement.id}-error`);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = this._validationMessage;
    this._inputElement.classList.add(this._inputErrorClass);
  }

  // Если форма валидна, скрываем ошибку. Если нет, показываем
  _checkInputValid() {
    if (this._inputElement.validity.valid) {
      this._hideInputError(this._formElement, this._inputElement, this._config);
    } else {
      this._showInputError(this._formElement, this._inputElement, this._config);
    }
  }

  // проверяет если хотя бы одно из полей не прошло валидацию - НЕ ИСПРАВЛЯЛА ДАЛЬШЕ
  _hasInputValid(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
  };

  // активное состояние кнопки
  _enableSubmitButton(inputList, buttonElement, config) {
    if (hasInputValid(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
    }
  }

// неактивное состояние кнопки
  _disableSubmitButton(inputList, buttonElement, config) {
    if (!hasInputValid(inputList)) {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

// функция которая меняет состояние кнопки
  _toogleButtonState(inputList, buttonElement, config) {
    enableSubmitButton(inputList, buttonElement, config);
    disableSubmitButton(inputList, buttonElement, config);
}

// проверяем валидность полей ввода
  _setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
// Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toogleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValid(formElement, inputElement, config);
      toogleButtonState(inputList, buttonElement, config);
    });
  });
  }

// функция ответственная за включение валидации всех форм 
  enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, config);
    });
  }
}