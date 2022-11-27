
const popup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.profile__button-edit');
const closeElement = document.querySelector('.popup__close');

buttonEdit.addEventListener('click', openedPopup);
closeElement.addEventListener('click', closePopup);

function openedPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}


// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__career');
const saveButton = document.querySelector('.popup__save');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    const userName = document.querySelector('.profile__intro-title');
    const userJob = document.querySelector('.profile__intro-subtitle');

    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;

    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
