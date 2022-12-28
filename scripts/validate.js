
// функция скрытия ошибки
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = ' ';
  inputElement.classList.remove(config.inputErrorClass);
}

// функция показа ошибки
function showInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
}

// Если форма валидна, скрываем ошибку. Если нет, показываем
function checkInputValid(formElement, inputElement, config) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
}

// проверяет если хотя бы одно из полей не прошло валидацию
function hasInputValid(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};
 
// активное состояние кнопки
function enableSubmitButton(inputList, buttonElement, config) {
  if (hasInputValid(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  }
}

// неактивное состояние кнопки
function disableSubmitButton(inputList, buttonElement, config) {
  if (!hasInputValid(inputList)) {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// функция которая меняет состояние кнопки
function toogleButtonState(inputList, buttonElement, config) {
  enableSubmitButton(inputList, buttonElement, config);
  disableSubmitButton(inputList, buttonElement, config);
}

// проверяем валидность полей ввода
function setEventListeners(formElement, config) {
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
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}