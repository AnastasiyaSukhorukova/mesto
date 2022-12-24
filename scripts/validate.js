
// функция скрытия ошибки
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement}-error`);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = ' ';
  inputElement.classList.remove(config.inputErrorClass);
}

// функция показа ошибки
function showInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement}-error`);
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

// проверяет если хотя бы у одного инпута есть ошибка
function hasInputValid(inputList) {
  return inputList.some((inputElement) => {
    !inputElement.validity.valid;
  })
};

function toogleButtonState(inputList, buttonElement, config) {
  if(hasInputValid(inputList)) {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// проверяем валидность полей ввода
function setEventListeners(formElement, config) {
const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
const buttonElement = formElement.querySelector(config.submitButtonSelector);
toogleButtonState(inputList, buttonElement, config);
inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function() {
    checkInputValid(formElement, inputElement, config);
    toogleButtonState(inputList, buttonElement, config);
  });
});
}

// функция проверки всех форм на валидность 
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}