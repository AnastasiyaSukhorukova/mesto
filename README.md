# ПРОЕКТ: МЕСТО

* [Ссылка на курс](https://practicum.yandex.ru/profile/web/)

* [Ссылка на проект](https://anastasiyasukhorukova.github.io/mesto)

### Проектная работа №4 на курсе Яндекс.Практикум на факультете веб-разработки 

1. Верстка. 

* Внешний вид сайта соответствует макету: [Ссылка на макет в Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)
* Файловая структура организована по БЭМу.
* Вёрстка адаптивная: ширина зоны с содержимым должна меняться вместе с шириной окна браузера. 
* На странице присутствуют 6 карточек с фотографиями.

2. Попап редактирования профиля. 

* Реализовано одно диалоговое окно из макета — «Редактировать профиль». В нём два поля: «Имя» и «О себе», а также кнопка «Сохранить».

3. Переполнение содержимого в блоке.

* При редактировании данных профиля из попапа пользователь тоже может ввести длинный текст. Так в карточке «Карачаево-Черкессия» не вместившийся в блок текст обрезан, и появилось многоточие в конце.
* Cвойства text-overflow и white-space были изучены самостоятельно в документации CSS.

4. JavaScript.

* Открытие и закрытие попапа. Попап открывается по нажатию кнопки «Редактировать», а закрывается — при клике по крестику в правом верхнем углу.
* Поля формы. При открытии формы поля «Имя» и «О себе» заполненяются теми значениями, которые отображаются на странице. Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются.
* Редактирование имени и информации о себе. После внесения изменений и нажатия кнопки «Сохранить» информация на странице обновляется, а попап автоматически закрывается. 

5. Работа проверена по [чек-листу](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist-4.pdf) и прошла код ревью 

### Проектная работа №5 на курсе Яндекс.Практикум на факультете веб-разработки 

1. Работа с массивом карточек. При загрузке на странице отражаются 6 карточек, которые добавит JavaScript. 
2. Добавила в проект форму добавления новой карточки. [Ссылка на макет в Figma](https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1&t=xCWSyB5J9bYNfp7K-0)
3. Добавление карточки. Добавила пользователю возможность добавлять карточки. При клике на «сохранить» новая карточка попает в начало контейнера с ними. А диалоговое окно после добавления автоматически закрывается.
4. Лайк карточки и удаление карточек. 
5. Открытие попапа с картинкой. Настроила просмотр фотографий - открываются нажатием на картинку и закрываются кликом на крестик.
6. Плавное открытие и закрытие попапов.
7. Работа проверена по [чек-листу](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist-5.pdf) и прошла код ревью 

### Проектная работа №6 на курсе Яндекс.Практикум на факультете веб-разработки

1. Валидация формы «Редактировать профиль». Если поле формы «Редактировать профиль» не прошло валидацию, под ним должен появляться красный текст ошибки.
2. Валидация формы «Новое место». Если хотя бы одно из полей не прошло валидацию, кнопка «Сохранить» должна быть неактивной. Если оба поля прошли — активной. Цвета неактивных кнопок те же.
3. Закрытие попапа кликом на оверлей. Попап закрывается кликом на тёмный фон.
4. Закрытие попапа нажатием на Esc.
5. Работа проверена по [чек-листу](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist-6.pdf) и прошла код ревью 

Спасибо за внимание!
