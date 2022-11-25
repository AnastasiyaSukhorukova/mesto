
let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__button-edit');

buttonEdit.addEventListener('click', function() {
  popup.classList.add('popup_opened')
});



let closeElement = document.querySelector('.popup__close');

closeElement.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

// Находим форму в DOM
/*let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__career');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    nameInput.value = 
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);*/
