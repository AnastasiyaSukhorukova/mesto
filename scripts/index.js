
const popup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.profile__button-edit');
const closeElement = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const saveButton = document.querySelector('.popup__save');
const userName = document.querySelector('.profile__intro-title');
const userJob = document.querySelector('.profile__intro-subtitle');

function openedPopup() {
  popup.classList.add('popup_opened');
}
// По заданию при открытии попапа инпуты должны заполняться данными со страницы - не совсем поняла замечание - попап заполняется данными со страницами


function closePopup() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  closePopup();
}

buttonEdit.addEventListener('click', openedPopup);
closeElement.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit);
